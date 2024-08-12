interface Transaction {
  id: string
  userId: number
  accountId: string
  category: string | undefined
  date: string
  authorizedDate: string | null
  name: string
  channel: string
  amount: number
  currencyCode: string | null
  pending: boolean
  is_removed: boolean
  account_name: string
  bank_name: string
}

export { Transaction }
