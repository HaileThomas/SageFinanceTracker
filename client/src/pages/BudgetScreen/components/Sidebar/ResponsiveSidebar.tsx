import { Fragment } from 'react/jsx-runtime'
import { BudgetPage } from '../../Content'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'
import { useIsDesktop } from '../../../../hooks/useIsDesktop'

interface SidebarProps {
  setSelectedPage: (page: BudgetPage) => void
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const isDesktop = useIsDesktop()

  return (
    <Fragment>
      {isDesktop ? (
        <DesktopSidebar setSelectedPage={props.setSelectedPage} />
      ) : (
        <MobileSidebar setSelectedPage={props.setSelectedPage} />
      )}
    </Fragment>
  )
}
