import { Transaction as PlaidTransaction } from 'plaid'

interface Transaction {
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

const simplifyTransaction = (transactionObj: PlaidTransaction, userId: number): Transaction => {
  return {
    id: transactionObj.transaction_id,
    userId: userId,
    accountId: transactionObj.account_id,
    category: transactionObj.personal_finance_category?.primary,
    date: transactionObj.date,
    authorizedDate: transactionObj.authorized_date,
    channel: transactionObj.payment_channel,
    name: transactionObj.merchant_name ?? transactionObj.name,
    amount: transactionObj.amount,
    currencyCode: transactionObj.iso_currency_code,
    pending: transactionObj.pending,
  }
}

export { simplifyTransaction }
