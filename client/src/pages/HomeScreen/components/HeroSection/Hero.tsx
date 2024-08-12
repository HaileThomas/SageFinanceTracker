import { MainRedirectButton } from '../../../../components/interface/Button/Button'
import { useAuth } from '../../../../context/AuthenticationContext'
import WavyFooter from './components/WavyFooter'
import './Hero.css'

export default function Hero() {
  return (
    <div className='home-hero-wrapper center-elements background-green'>
      <div className='home-hero-card center-elements align-text-center'>
        <div className='hero-card-heading'>
          <h1 className='beige-text'> Financing </h1>
          <h1 className='bold-text'> Your Wallet </h1>
        </div>
        <p className='beige-text center-text'>Navigate your finances effortlessly with Sage. Our intuitive dashboard empowers smart money management—from budget tracking to insightful analytics.</p>
        <MainRedirectButton link='/budget'> Get Started </MainRedirectButton>
      </div>
      <WavyFooter />
    </div>
  )
}
