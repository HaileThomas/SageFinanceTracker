import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { NavigationItem } from './NavigationItem/NavigationItem'
import './StandardSidebar.css'

export interface NavigationItemProps {
  icon: IconDefinition
  text: string
  action?: () => void
}

interface NavigationProps {
  headerItems: NavigationItemProps
  navigationItems: NavigationItemProps[]
  footerItems: NavigationItemProps
}

export default function StandardSidebar(props: NavigationProps) {
  return (
    <div className='standard-sidebar-wrapper'>
      <div className='standard-sidebar-content-wrapper stack-elements-justified'>
        <NavigationItem.Header {...props.headerItems} />
        <div className='standard-sidebar-navigation'>
          {props.navigationItems.map((item, index) => (
            <NavigationItem.NavItem key={index} {...item} />
          ))}
        </div>
        <NavigationItem.Footer {...props.footerItems} />
      </div>
    </div>
  )
}
