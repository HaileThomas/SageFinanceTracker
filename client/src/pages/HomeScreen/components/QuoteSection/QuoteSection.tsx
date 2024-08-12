import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import WipeText from '../../../../components/animation/WipeText/WipeText'
import Divider from '../../../../components/interface/Divider/Divider'
import './QuoteSection.css'

export default function QuoteSection() {
  return (
    <div className='stack-elements align-text-center quote-section-container'>
      <Divider />
      <div className='quote-section-icon'>
        <FontAwesomeIcon icon={faQuoteLeft} className='quote-icon' />
      </div>
      <WipeText>
        <h2 className='small-height-offset'>
          A budget is telling your money where to go instead of wondering where
          it went.
        </h2>
      </WipeText>
      <Divider />
    </div>
  )
}
