import { Request, Response } from 'express'
import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid'
import { plaidClient } from '../config/plaid'
import { addItem } from '../services/itemService'
import { addAccount } from '../services/accountService'
import dotenv from 'dotenv'
dotenv.config()

const createLinkToken = async (req: Request, res: Response) => {
  const { userId } = req.body

  const plaidRequest: LinkTokenCreateRequest = {
    user: {
      client_user_id: `${userId}`,
    },
    link_customization_name: process.env.PLAID_LINK_NAME || undefined,
    client_name: 'Sage',
    products: [Products.Auth, Products.Transactions],
    language: 'en',
    redirect_uri: 'http://localhost:5173/',
    country_codes: [CountryCode.Us],
  }

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest)
    res.status(200).json({ PlaidToken: createTokenResponse.data })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Unable to create link token' })
  }
}

const connectBank = async (req: Request, res: Response) => {
  const { userId, itemId, accessToken } = req.body

  try {
    const {
      data: { item },
    } = await plaidClient.itemGet({ access_token: accessToken })
    const institutionId = item.institution_id

    if (userId && itemId && accessToken && institutionId) {
      await addItem(userId, itemId, accessToken, institutionId)
    }

    const {
      data: { accounts },
    } = await plaidClient.accountsGet({ access_token: accessToken })

    await Promise.all(
      accounts.map(async (account) => {
        return addAccount(account.account_id, itemId, account.name)
      })
    )

    res.status(200).json({ Status: 'Success', Message: 'Bank connected successfully' })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'An error occurred while connecting to the bank' })
  }
}

export { createLinkToken, connectBank }
