import { Request, Response } from 'express'
import { getItemName, getItemsForUser } from '../services/itemService'
import { getExpensesForUser, getRecentTransactionsForUser, syncTransactions as refreshTransactions } from '../services/transactionService'

const syncTransactions = async (req: Request, res: Response) => {
  const { userId } = req.body as { userId: number }

  try {
    const items = await getItemsForUser(userId)

    const fullResults = await Promise.all(
      items.map(async (item) => {
        try {
          return await refreshTransactions(item.id)
        } catch (err) {
          return null
        }
      })
    )

    res.status(200).json({ completeResults: fullResults })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Failed to sync transactions' })
  }
}

const listTransactions = async (req: Request, res: Response) => {
  const { userId, maxCount } = req.body as { userId: number; maxCount: number }

  try {
    const transactions = await getRecentTransactionsForUser(userId, maxCount)

    const result = await Promise.all(
      transactions.map(async (transaction) => {
        const bankName = await getItemName(transaction.bank_name)

        return {
          ...transaction,
          bank_name: bankName,
        }
      })
    )

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Failed to list transactions' })
  }
}

const listExpenses = async (req: Request, res: Response) => {
  const { userId } = req.body as { userId: number; maxCount: number }

  try {
    const transactions = await getExpensesForUser(userId)

    const result = await Promise.all(
      transactions.map(async (transaction) => {
        const bankName = await getItemName(transaction.bank_name)

        return {
          ...transaction,
          bank_name: bankName,
        }
      })
    )

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Failed to list expenses' })
  }
}

export { syncTransactions, listTransactions, listExpenses }
