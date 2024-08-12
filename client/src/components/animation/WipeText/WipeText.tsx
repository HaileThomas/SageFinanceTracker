import { useVisiblePercentage } from '../../../hooks/useVisiblePercentage'
import { ReactNode } from 'react'
import './WipeText.css'

interface WipeTextProps {
  children: ReactNode
}

export default function WipeText(props: WipeTextProps) {
  const { ref, visiblePercentage } = useVisiblePercentage(1.6)

  return (
    <div className='wipe-text-container' ref={ref}>
      <div className='text-on-top' style={{ height: `${visiblePercentage}%` }}>
        {props.children}
      </div>
      <div className='text-on-bottom'> {props.children} </div>
    </div>
  )
}
