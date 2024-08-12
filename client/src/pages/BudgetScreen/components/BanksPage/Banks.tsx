import { ActionButton } from '../../../../components/interface/Button/Button'
import BudgetWrapper from '../Wrapper/BudgetWrapper'
import BankCard from './components/BankCard'
import { useAuth } from '../../../../context/AuthenticationContext'
import { useIsDesktop } from '../../../../hooks/useIsDesktop'
import { usePlaidLink } from '../../../../hooks/usePlaidLink'
import { fetchAccountsInfo } from '../../../../api/plaidBank'
import { useEffect, useState } from 'react'
import { Empty, Pagination } from 'antd'
import { serverRefresh } from '../../../../api/plaidTransaction'
import './Banks.css'

interface CurrentCardsProps {
  cardsPerPage: number
  page: number
  data: BankBalance[]
}

interface BankBalance {
  name: string
  mask: string | null
  balance: number | null
  type: string | null
}

function CurrentCards(props: CurrentCardsProps) {
  const startIndex = (props.page - 1) * props.cardsPerPage
  const endIndex = props.page * props.cardsPerPage
  const currentCards = props.data.slice(startIndex, endIndex)

  return (
    <>
      {currentCards.length === 0 ? (
        <Empty description='No bank accounts found' />
      ) : (
        currentCards.map((item, index) => <BankCard key={index} name={item.name} mask={item.mask} balance={item.balance} type={item.type} />)
      )}
    </>
  )
}

export default function Banks() {
  const [isInitiallyLoading, setInitiallyLoading] = useState<boolean>(true)
  const [bankCards, setBankCards] = useState<BankBalance[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { userID } = useAuth()

  const isDesktop = useIsDesktop(1350)
  const CARDS_PER_PAGE = isDesktop ? 6 : 4

  const { open, ready } = usePlaidLink(() => fetchData())

  const fetchData = async () => {
    if (userID) {
      try {
        const result = await fetchBankAccounts(userID)
        setBankCards(result)
        serverRefresh({ userId: userID })
      } catch (err) {
        throw new Error('Unable to retrieve banking information. ')
      } finally {
        setInitiallyLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BudgetWrapper header='My Bank Accounts' subheader='Manage Your Portfolio' loading={isInitiallyLoading}>
      <div className='name-cards-heading-container space-elements-between-horizontally'>
        <p className='header small'> Your Cards </p>
        <ActionButton onClick={() => open()} disabled={!ready} halfHeight>
          Add Bank
        </ActionButton>
      </div>
      <div className={`bank-cards-container ${bankCards.length == 0 ? 'empty' : ''}`}>
        <CurrentCards cardsPerPage={CARDS_PER_PAGE} page={currentPage} data={bankCards} />
      </div>
      <div className='banks-pagination'>
        <Pagination align='end' pageSize={CARDS_PER_PAGE} current={currentPage} onChange={setCurrentPage} total={bankCards.length} showSizeChanger={false} />
      </div>
    </BudgetWrapper>
  )
}

const fetchBankAccounts = async (userID: number): Promise<BankBalance[]> => {
  const accounts = await fetchAccountsInfo({ userId: userID })
  return accounts
}
