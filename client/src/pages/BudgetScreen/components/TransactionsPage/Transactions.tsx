import BudgetWrapper from '../Wrapper/BudgetWrapper'
import { Table, TableColumnsType } from 'antd'
import { Key, useEffect, useState } from 'react'
import { fetchTransactions, serverRefresh } from '../../../../api/plaidTransaction'
import { useAuth } from '../../../../context/AuthenticationContext'
import './Transactions.css'
import { amountSorter, generateCategoryFilters, generateChannelFilters, renderAmountText, renderStatusTag } from './utils/columnsUtils'
import { makeReadable } from '../../../../utils/stringUtils'
import { formatDate } from '../../../../utils/dateUtils'

export type TransactionResult = 'Completed' | 'Pending' | 'Error'

export interface Transaction {
  key: string
  transaction: string
  amount: number
  currencyCode: string | null
  status: TransactionResult
  date: string
  channel: string
  category: string
}

interface TransactionResponse {
  id: string
  userId: number
  accountId: string
  category: string | undefined
  date: string
  authorizedDate: string | null
  channel: string
  pending: boolean
  name: string
  amount: number
  currency_code: string | null
  is_removed: boolean
  account_name: string
  bank_name: string
}

export default function Transactions() {
  const [isInitiallyLoading, setInitiallyLoading] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { userID } = useAuth()

  const columns: TableColumnsType<Transaction> = [
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      width: 200,
      fixed: 'left',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: amountSorter,
      render: (text: number, record: Transaction) => renderAmountText(text, record.currencyCode),
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: TransactionResult) => renderStatusTag(status),
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      filters: generateChannelFilters(transactions),
      onFilter: (value: boolean | Key, record: Transaction) => record.channel === value,
      width: 150,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: generateCategoryFilters(transactions),
      onFilter: (value: boolean | Key, record: Transaction) => record.category === value,
      width: 150,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchLocalTransactions(userID)
        setTransactions(result)
      } catch (err) {
        throw new Error('Unable to retrieve transaction information.')
      } finally {
        setInitiallyLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <BudgetWrapper header='Transactions' subheader='View Expenses' loading={isInitiallyLoading}>
      <div className='transactions-heading-container space-elements-between-horizontally'>
        <p className='header small'> Recent Transactions </p>
      </div>
      <div className='transactions-table'>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: 100, showSizeChanger: false }}
          scroll={{ x: true, y: 'calc(100vh - 310px)' }}
        />
      </div>
    </BudgetWrapper>
  )
}

const fetchLocalTransactions = async (userID: number | null) => {
  let data: Transaction[] = []

  if (userID) {
    serverRefresh({ userId: userID })
    const res: TransactionResponse[] = await fetchTransactions({
      userId: userID,
      maxCount: 500,
    })

    data = res.map((original) => ({
      key: original.id,
      transaction: makeReadable(original.name),
      amount: original.amount,
      currencyCode: original.currency_code,
      status: original.pending ? 'Pending' : 'Completed',
      date: original.date,
      channel: original.channel == 'other' ? 'Miscellaneous' : makeReadable(original.channel),
      category: makeReadable(original.category) ?? '',
    }))
  }

  return data
}
