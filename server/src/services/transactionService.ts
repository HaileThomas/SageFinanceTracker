import { TransactionsSyncResponse } from 'plaid'
import { Transaction as TransactionResponse } from '../models/Transaction'
import { Expense as ExpenseResponse } from '../models/Expense'
import { simplifyTransaction } from '../utils/transactionUtil'
import { plaidClient } from '../config/plaid'
import { ResultSetHeader } from 'mysql2'
import { getItem } from './itemService'
import { database as db } from '../config/database'

interface TransactionUpdates {
  added: number
  removed: number
  modified: number
}

interface DataResponse {
  added: TransactionsSyncResponse['added']
  modified: TransactionsSyncResponse['modified']
  removed: TransactionsSyncResponse['removed']
  nextCursor: string | undefined
}

interface TransactionDBS {
  id: string
  userId: number
  accountId: string
  category: string | undefined
  date: string
  authorizedDate: string | null
  channel: string
  name: string
  amount: number
  currencyCode: string | null
  pending: boolean
}

const getRecentTransactionsForUser = async (userId: number, maxCount: number): Promise<TransactionResponse[]> => {
  try {
    const [result] = await db.promise().query(
      `SELECT transactions.*,
        accounts.name as account_name,
        items.institution_id as bank_name
      FROM transactions
      JOIN accounts ON transactions.account_id = accounts.id
      JOIN items ON accounts.item_id = items.id
      WHERE transactions.user_id = ?
        and is_removed = 0
      ORDER BY date DESC
      LIMIT ?`,
      [userId, maxCount]
    )

    return result as TransactionResponse[]
  } catch (err) {
    throw new Error('Failed to get recent transaction from database.')
  }
}

const getExpensesForUser = async (userId: number): Promise<ExpenseResponse[]> => {
  try {
    const [result] = await db.promise().query(
      `SELECT transactions.amount,
      transactions.date,
        items.institution_id as bank_name
      FROM transactions
      JOIN accounts ON transactions.account_id = accounts.id
      JOIN items ON accounts.item_id = items.id
      WHERE transactions.user_id = ?
        and is_removed = 0
        and transactions.date >= DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-01'), INTERVAL 1 YEAR)
        and transactions.amount >= 0
      ORDER BY date DESC`,
      [userId]
    )

    return result as ExpenseResponse[]
  } catch (err) {
    throw new Error('Failed to get recent expenses from database.')
  }
}

const syncTransactions = async (itemId: string): Promise<TransactionUpdates> => {
  const summary: TransactionUpdates = { added: 0, removed: 0, modified: 0 }

  try {
    const { access_token: accessToken, transaction_cursor: transactionCursor, user_id: userId } = await getItem(itemId)
    const data = await fetchNewData(accessToken, transactionCursor)

    await Promise.all(
      data.added.map(async (transactionObject) => {
        const transaction = simplifyTransaction(transactionObject, userId)
        const res = await addNewTransaction(transaction)

        if (res) {
          summary.added += res.affectedRows
        }
      })
    )

    await Promise.all(
      data.modified.map(async (transactionObject) => {
        const transaction = simplifyTransaction(transactionObject, userId)
        const res = await modifyExistingTransaction(transaction)

        if (res) {
          summary.modified != res.affectedRows
        }
      })
    )

    await Promise.all(
      data.removed.map(async (transactionObject) => {
        const res = await markTransactionAsRemoved(userId, transactionObject.transaction_id)

        if (res) {
          summary.modified != res.affectedRows
        }
      })
    )

    return summary
  } catch (err) {
    throw new Error('Failed to retrieve transactions from plaid.')
  }
}

const fetchNewData = async (accessToken: string, initialCursor: string, retriesLeft = 3): Promise<DataResponse> => {
  let keepGoing = false
  const result: DataResponse = { added: [], modified: [], removed: [], nextCursor: initialCursor }

  if (retriesLeft <= 0) {
    return result
  }

  try {
    do {
      const { data: newData } = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor: result.nextCursor,
        options: {
          include_personal_finance_category: true,
        },
      })

      result.added = [...result.added, ...newData.added]
      result.modified = [...result.modified, ...newData.modified]
      result.removed = [...result.removed, ...newData.removed]
      result.nextCursor = newData.next_cursor

      keepGoing = newData.has_more
    } while (keepGoing)

    return result
  } catch (err) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return fetchNewData(accessToken, initialCursor, retriesLeft - 1)
  }
}

const addNewTransaction = async (transaction: TransactionDBS): Promise<ResultSetHeader> => {
  try {
    const [rows] = await db.promise().query(
      `INSERT INTO transactions
      (id, user_id, account_id, category, date, authorized_date, name, amount, 
        currency_code, is_removed, channel, pending)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        user_id = VALUES(user_id),
        account_id = VALUES(account_id),
        category = VALUES(category),
        date = VALUES(date),
        authorized_date = VALUES(authorized_date),
        name = VALUES(name),
        amount = VALUES(amount),
        currency_code = VALUES(currency_code),
        channel = VALUES(channel),
        pending = VALUES(pending)
    `,
      [
        transaction.id,
        transaction.userId,
        transaction.accountId,
        transaction.category,
        transaction.date,
        transaction.authorizedDate,
        transaction.name,
        transaction.amount,
        transaction.currencyCode,
        0,
        transaction.channel,
        transaction.pending,
      ]
    )

    return rows as ResultSetHeader
  } catch (err) {
    throw new Error('Failed to add transaction to database.')
  }
}

const modifyExistingTransaction = async (transaction: TransactionDBS): Promise<ResultSetHeader> => {
  try {
    const [result] = await db.promise().query(
      `UPDATE transactions 
      SET account_id = ?, category = ?, date = ?, 
      authorized_date = ?, name = ?, amount = ?, currency_code = ?, channel = ?, pending = ? 
      WHERE id = ? AND user_id = ? 
      `,
      [
        transaction.accountId,
        transaction.category,
        transaction.date,
        transaction.authorizedDate,
        transaction.name,
        transaction.amount,
        transaction.currencyCode,
        transaction.channel,
        transaction.pending,
        transaction.id,
        transaction.userId,
      ]
    )

    return result as ResultSetHeader
  } catch (err) {
    throw new Error('Failed to modify transaction in database.')
  }
}

const markTransactionAsRemoved = async (userId: number, transacionId: string): Promise<ResultSetHeader> => {
  try {
    const updatedId = transacionId + '-REMOVED-' + crypto.randomUUID()
    const [result] = await db.promise().query(
      `UPDATE transactions 
      SET id = ?, is_removed = ?
      WHERE id = ? AND user_id = ? 
      `,
      [updatedId, 1, transacionId, userId]
    )

    return result as ResultSetHeader
  } catch (err) {
    throw new Error('Failed to mark transaction as removed in database.')
  }
}

export { getRecentTransactionsForUser, getExpensesForUser, syncTransactions }
