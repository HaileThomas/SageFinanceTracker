import CollapsableIcon from './components/CollapsableIcon'
import { useToggle } from '../../../hooks/useToggle'
import './Collapsable.css'

interface CollapsableProps {
  question: string
  answer: string
}

export default function Collapsable(props: CollapsableProps) {
  const [expanded, toggleExpanded] = useToggle(false)

  return (
    <div className='stack-elements-evenly collapsable-card'>
      <div className='space-elements-between-horizontally'>
        <p className='bold-text question'> {props.question} </p>
        <CollapsableIcon isExpanded={expanded} toggle={toggleExpanded} />
      </div>
      <div className={`answer ${expanded ? 'expanded' : 'collapsed'}`}>
        <p className='fine-text'> {props.answer} </p>
      </div>
    </div>
  )
}
