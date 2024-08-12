import { database as db } from '../config/database'
import { plaidClient } from '../config/plaid'
import { Account as AccountResponse } from '../models/Account'

const addAccount = async (accountId: string, itemId: string, accountName: string): Promise<void> => {
  try {
    await db.promise().query(`INSERT INTO accounts (id, item_id, name) VALUES (?, ?, ?)`, [accountId, itemId, accountName])
  } catch (err) {
    throw new Error('Failed to add account to database.')
  }
}

const getAccountsForItem = async (accessToken: string): Promise<AccountResponse[]> => {
  try {
    const { data } = await plaidClient.accountsBalanceGet({ access_token: accessToken })

    const accounts: AccountResponse[] = data.accounts.map((account) => ({
      name: account.official_name || account.name,
      mask: account?.mask,
      balance: account.balances?.current,
      type: account?.subtype,
    }))

    return accounts
  } catch (err) {
    throw new Error('Failed to retrieve accounts for item.')
  }
}

const removeAccount = async (accountId: string): Promise<void> => {
  try {
    await db.promise().query('DELETE FROM accounts WHERE id = ?', [accountId])
  } catch (err) {
    throw new Error('Failed to remove account from database.')
  }
}

export { addAccount, getAccountsForItem, removeAccount }
