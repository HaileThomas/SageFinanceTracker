import StandardSidebar, {
  NavigationItemProps,
} from '../../../../components/interface/Sidebar/StandardSidebar/StandardSidebar'
import { faArrowRightFromBracket, faCreditCard, faFire, faReceipt, faTags } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { BudgetPage } from '../../Content'
import { showConfirmModal } from '../../../../components/interface/Modal/ConfirmationModal'
import { handleLogoutApi } from '../../../../api/authentication'
import { faLandmark } from '@fortawesome/free-solid-svg-icons/faLandmark'

interface StandardSidebarProps {
  setSelectedPage: (page: BudgetPage) => void
}

export default function DesktopSidebar(props: StandardSidebarProps) {
  const navigate = useNavigate()

  const header: NavigationItemProps = {
    icon: faFire,
    text: 'Sage',
    action: () => navigate('/'),
  }

  const navigation: NavigationItemProps[] = [
    {
      icon: faCreditCard,
      text: 'Banks',
      action: () => props.setSelectedPage('Banks'),
    },
    {
      icon: faLandmark,
      text: 'Overview',
      action: () => props.setSelectedPage('Overview'),
    },
    {
      icon: faTags,
      text: 'Transactions',
      action: () => props.setSelectedPage('Transactions'),
    },
  ]

  const footer: NavigationItemProps = {
    icon: faArrowRightFromBracket,
    text: 'Log Out',
    action: () =>
      showConfirmModal({
        title: 'Confirmation',
        content: 'Are you sure you want to log out?',
        onOk: async () => {
          await handleLogoutApi()
          await new Promise((resolve) => setTimeout(resolve, 1000))
          navigate('/')
        },
      }),
  }

  return <StandardSidebar headerItems={header} navigationItems={navigation} footerItems={footer} />
}
