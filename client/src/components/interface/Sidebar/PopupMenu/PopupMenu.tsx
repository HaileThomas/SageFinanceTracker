import { MenuOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import { ReactNode } from 'react'
import './PopupMenu.css'

export interface NavigationItemProps {
  icon: ReactNode
  text: string
  action?: () => void
}

interface NavigationProps {
  headerItems: NavigationItemProps
  navigationItems: NavigationItemProps[]
  footerItems: NavigationItemProps
}

export default function PopupMenu(props: NavigationProps) {
  return (
    <FloatButton.Group trigger='click' type='primary' className='floating-menu' icon={<MenuOutlined />}>
      <FloatButton icon={props.footerItems.icon} onClick={props.footerItems.action} />
      {props.navigationItems.map((item, index) => (
        <FloatButton key={index} icon={item.icon} onClick={item.action} />
      ))}
    </FloatButton.Group>
  )
}
