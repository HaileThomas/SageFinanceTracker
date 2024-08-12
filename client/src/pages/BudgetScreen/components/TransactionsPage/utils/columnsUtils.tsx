import { Transaction, TransactionResult } from '../Transactions'
import { Badge, Tag } from 'antd'
import { currencyAmount } from '../../../../../utils/currencyUtils'

const amountSorter = (a: { amount: number }, b: { amount: number }) => a.amount - b.amount

const renderStatusTag = (status: TransactionResult) => {
  const tagInfo: Record<TransactionResult, 'success' | 'processing' | 'error' | 'default' | 'warning'> = {
    Completed: 'success',
    Pending: 'processing',
    Error: 'error',
  }

  const info = tagInfo[status] || 'default'

  return (
    <Tag color={info}>
      <Badge status={info} text={status} />
    </Tag>
  )
}

const renderAmountText = (amount: number, currencyCode: string | null) => {
  const formattedAmount = currencyAmount(Math.abs(amount), currencyCode)

  return (
    <span
      style={{
        color: amount > 0 ? 'var(--off-red)' : 'var(--teal-green)',
        fontWeight: 'bold',
      }}
    >
      {formattedAmount}
    </span>
  )
}

const generateChannelFilters = (data: Transaction[]) => {
  const channels = new Set(data.map((item) => item.channel))

  return Array.from(channels).map((channel) => ({
    text: channel,
    value: channel,
  }))
}

const generateCategoryFilters = (data: Transaction[]) => {
  const categories = new Set(data.map((item) => item.category))

  return Array.from(categories).map((category) => ({
    text: category,
    value: category,
  }))
}

export { amountSorter, renderStatusTag, renderAmountText, generateChannelFilters, generateCategoryFilters }
