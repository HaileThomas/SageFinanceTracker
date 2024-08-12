import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavigationItemProps } from '../StandardSidebar'
import './NavigationItem.css'

const NavigationItemContent = (props: NavigationItemProps): JSX.Element => {
  return (
    <>
      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={props.icon} flip='horizontal' />
      </div>
      <p className='beige-text'>{props.text}</p>
    </>
  )
}

export const NavigationItem = {
  Footer: (props: NavigationItemProps) => (
    <div className='sidebar-footer-item' onClick={props.action}>
      <NavigationItemContent {...props} />
    </div>
  ),
  Header: (props: NavigationItemProps) => (
    <div className='sidebar-header-item' onClick={props.action}>
      <NavigationItemContent {...props} />
    </div>
  ),
  NavItem: (props: NavigationItemProps) => (
    <div className='sidebar-navigation-item' onClick={props.action}>
      <NavigationItemContent {...props} />
    </div>
  ),
}
