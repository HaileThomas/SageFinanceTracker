import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import './HomeNavbar.css'

export default function HomeNavbar() {
  return (
    <header className='home-navbar center-elements-horizontally background-green'>
      <FontAwesomeIcon icon={faFire} flip='horizontal' size='2x' style={{ color: 'var(--teal)' }} />
      <h3 className='text'> Sage </h3>
    </header>
  )
}
