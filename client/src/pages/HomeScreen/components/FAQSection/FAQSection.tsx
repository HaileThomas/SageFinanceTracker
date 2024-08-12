import Collapsable from '../../../../components/interface/Collapsable/Collapsable'
import { FAQInfo } from './FAQData'
import './FAQSection.css'

export default function FAQSection() {
  return (
    <div className='shortened-full-page center-elements-horizontally'>
      <div className='FAQSection-outer-card space-elements-between-horizontally'>
        <h2> FAQS </h2>
        <div className='FAQSection-inner-card stack-elements height-offset'>
          {FAQInfo.map((item, index) => (
            <Collapsable
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
