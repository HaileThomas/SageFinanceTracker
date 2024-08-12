import { Sidebar } from './components/Sidebar/ResponsiveSidebar'
import { showNotification } from '../../components/interface/Notification/Notification'
import { BudgetPage, renderContent } from './Content'
import { useState } from 'react'
import './Budget.css'

export default function Budget() {
  const [selectedPage, setSelectedPage] = useState<BudgetPage>('Banks')
  const [lastClick, setLastClick] = useState(new Date().getTime())

  const handleClick = (page: BudgetPage) => {
    if (page !== selectedPage) {
      if (new Date().getTime() - lastClick < 10000) {
        showNotification({
          type: 'info',
          message: 'Slow Down',
          description: "It looks like you're making requests too quickly. Please take a moment and try again soon.",
        })
      } else {
        setLastClick(new Date().getTime())
        setSelectedPage(page)
      }
    }
  }

  return (
    <div className='full-page center-elements-horizontally'>
      <Sidebar setSelectedPage={handleClick} />
      <div className='full-page center-elements budget-screen-container'>{renderContent(selectedPage)}</div>
    </div>
  )
}
