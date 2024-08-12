import { Request, Response } from 'express'
import { getItemsForUser } from '../services/itemService'
import { getAccountsForItem } from '../services/accountService'

const getAccountBalances = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const accounts = await getItemsForUser(userId)

    const balances = await Promise.all(
      accounts.map(async (account) => {
        try {
          return await getAccountsForItem(account.access_token)
        } catch (err) {
          return []
        }
      })
    )

    res.status(200).json({ AccountBalances: balances.flat() })
  } catch (err) {
    res.status(500).json({ Status: 'error', Error: 'Failed to retrieve bank account balances' })
  }
}

export { getAccountBalances }
