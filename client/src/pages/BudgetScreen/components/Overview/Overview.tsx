import LineChart from '../../../../components/charts/LineChart/LineChart'
import BudgetWrapper from '../Wrapper/BudgetWrapper'
import DataWidget from './components/DataWidget'
import { useAuth } from '../../../../context/AuthenticationContext'
import { fetchAccountsInfo } from '../../../../api/plaidBank'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { fetchTransactionAmounts } from '../../../../api/plaidTransaction'
import { retrieveMonths } from './utils/retrieveMonths'
import { aggregateMonthlyTotals } from './utils/aggregateMonthlyTotals'
import { uppercaseText } from '../../../../utils/stringUtils'
import './Overview.css'

export default function Overview() {
  const [isInitiallyLoading, setInitiallyLoading] = useState<boolean>(true)
  const [netWorth, setNetWorth] = useState<number | undefined>(undefined)
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([])
  const { userID } = useAuth()
  const username = uppercaseText(useAuth().username?.split('@')[0])

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        try {
          const [netWorthResult, expensesResult] = await Promise.all([fetchNetWorth(userID), fetchExpenses(userID)])

          setNetWorth(netWorthResult)
          setExpenses(expensesResult)
        } catch (err) {
          throw new Error('Unable to retrieve overview information.')
        } finally {
          setInitiallyLoading(false)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <BudgetWrapper header={`Welcome Back, ${username}`} subheader='This is your Financial Overview Report' loading={isInitiallyLoading}>
      <Row gutter={16} justify={'start'}>
        <Col xs={22} sm={8}>
          <DataWidget heading='Net Worth' value={netWorth} />
        </Col>
        <Col xs={22} sm={8}>
          <DataWidget heading='Expenditure' value={calculateTotalExpenses(expenses)} />
        </Col>
      </Row>
      <Row gutter={16} justify={'start'}>
        <Col xs={24}>
          <LineChart title='Recent Expenses' data={aggregateMonthlyTotals(expenses)} axis={retrieveMonths()} />
        </Col>
      </Row>
    </BudgetWrapper>
  )
}

const fetchNetWorth = async (userID: number): Promise<number> => {
  const accounts = await fetchAccountsInfo({ userId: userID })

  return accounts.reduce((total, account) => {
    return total + (account.balance || 0)
  }, 0)
}

interface ExpenseResponse {
  amount: number
  date: string
  bank_name: string
}

const calculateTotalExpenses = (expenses: ExpenseResponse[]): number => {
  return expenses.filter((expense) => expense.amount > 0).reduce((total, expense) => total + expense.amount, 0)
}

const fetchExpenses = async (userID: number): Promise<ExpenseResponse[]> => {
  const res: ExpenseResponse[] = await fetchTransactionAmounts({
    userId: userID,
  })

  return res
}
