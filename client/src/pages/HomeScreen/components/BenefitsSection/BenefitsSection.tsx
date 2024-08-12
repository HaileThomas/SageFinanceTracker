import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast, faGift, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import InfoCard from '../../../../components/interface/InfoCard/InfoCard'
import './BenefitsSection.css'

export default function BenefitsSection() {
  return (
    <div className='benefits-section-container'>
      <InfoCard
        icon={<FontAwesomeIcon icon={faTruckFast} size='2x' />}
        heading='Quick and Easy'
        subheading='Streamline your financial planning with our intuitive tools, designed to get you up and running fast.'
      />
      <InfoCard
        icon={<FontAwesomeIcon icon={faGift} size='2x' />}
        heading='All-in-One'
        subheading='From tracking expenses to setting savings goals, our platform covers every aspect of budgeting needs.'
      />
      <InfoCard
        icon={<FontAwesomeIcon icon={faShieldHalved} size='2x' />}
        heading='Secure and Reliable'
        subheading='Trust our robust platform to protect your financial data and ensure smooth, secure transactions.'
      />
    </div>
  )
}
