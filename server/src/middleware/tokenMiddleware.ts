import { Request, Response, NextFunction } from 'express'
import { plaidClient } from '../config/plaid'
import { getItemForBank, deactivateItem } from '../services/itemService'

export const exchangePublicToken = async (req: Request, res: Response, next: NextFunction) => {
  const { publicToken, userId, institutionId } = req.body

  try {
    const existingItem = await getItemForBank(institutionId, userId)

    if (existingItem) {
      try {
        await deactivateItem(existingItem.id)
        await plaidClient.itemRemove({ access_token: existingItem.access_token })
      } catch (err) {
        return res.status(409).json({ Status: 'Failure', Message: 'Failed to remove existing item' })
      }
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })

    req.body.accessToken = response.data.access_token
    req.body.itemId = response.data.item_id
    req.body.userId = userId as number

    next()
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Message: 'Failed to exchange public token' })
  }
}
