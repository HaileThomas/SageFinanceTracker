import dotenv from 'dotenv'
import { Configuration, PlaidEnvironments, PlaidApi } from 'plaid'
import { CountryCode } from 'plaid'

dotenv.config()
const PLAID_ENV = process.env.PLAID || 'sandbox'

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'PLAID-Version': '2020-09-14',
    },
  },
})

export const plaidClient = new PlaidApi(plaidConfig)
