import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './CollapsableIcon.css'

interface CollapsableIconProps {
  isExpanded: boolean
  toggle: () => void
}

export default function CollapsableIcon(props: CollapsableIconProps) {
  return (
    <button
      onClick={props.toggle}
      className={`collapsable-icon ${props.isExpanded ? 'rotated' : ''}`}
    >
      <FontAwesomeIcon icon={props.isExpanded ? faMinus : faPlus} />
    </button>
  )
}
