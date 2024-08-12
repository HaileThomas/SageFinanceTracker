import HomeNavbar from './components/HomeNavbar/HomeNavbar'
import Hero from './components/HeroSection/Hero'
import BenefitsSection from './components/BenefitsSection/BenefitsSection'
import FAQSection from './components/FAQSection/FAQSection'
import QuoteSection from './components/QuoteSection/QuoteSection'

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <Hero />
      <BenefitsSection />
      <QuoteSection />
      <FAQSection />
    </>
  )
}
