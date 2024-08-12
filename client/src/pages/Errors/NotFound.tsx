import { ErrorRedirectButton } from '../../components/interface/Button/Button'

export default function NotFound() {
  return (
    <div className='full-page center-elements'>
      <h1 className='full-page-header'> 404 </h1>
      <h3 className='full-page-subheader'> Page Not Found </h3>
      <ErrorRedirectButton link='/'> Go Home </ErrorRedirectButton>
    </div>
  )
}
