import Banks from './components/BanksPage/Banks'
import Overview from './components/Overview/Overview'
import Transactions from './components/TransactionsPage/Transactions'

export type BudgetPage = 'Banks' | 'Overview' | 'Transactions'

export const renderContent = (selectedPage: BudgetPage): JSX.Element => {
  switch (selectedPage) {
    case 'Banks':
      return <Banks />
    case 'Overview':
      return <Overview />
    case 'Transactions':
      return <Transactions />
    default:
      return <Banks />
  }
}
