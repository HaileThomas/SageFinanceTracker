import PopupMenu, { NavigationItemProps } from '../../../../components/interface/Sidebar/PopupMenu/PopupMenu'
import { BankOutlined, CreditCardOutlined, TagsOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { BudgetPage } from '../../Content'
import { handleLogoutApi } from '../../../../api/authentication'
import { showConfirmModal } from '../../../../components/interface/Modal/ConfirmationModal'

interface MobileSidebarProps {
  setSelectedPage: (page: BudgetPage) => void
}

export default function MobileSidebar(props: MobileSidebarProps): JSX.Element {
  const navigate = useNavigate()

  const header: NavigationItemProps = {
    icon: <> </>,
    text: 'Sage',
    action: () => navigate('/'),
  }

  const navigation: NavigationItemProps[] = [
    {
      icon: <CreditCardOutlined />,
      text: 'Banks',
      action: () => props.setSelectedPage('Banks'),
    },
    {
      icon: <BankOutlined />,
      text: 'Overview',
      action: () => props.setSelectedPage('Overview'),
    },
    {
      icon: <TagsOutlined />,
      text: 'Transactions',
      action: () => props.setSelectedPage('Transactions'),
    },
  ]

  const footer: NavigationItemProps = {
    icon: <LogoutOutlined />,
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

  return <PopupMenu headerItems={header} navigationItems={navigation} footerItems={footer} />
}
