import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthenticationContext'
import { handleLoginApi } from '../../../api/authentication'
import { FormButton } from '../../../components/interface/Button/Button'
import FormWrapper from '../../../components/interface/Form/FormWrapper'
import { BaseInput, PasswordInput } from '../../../components/interface/Form/Input/Input'
import { showNotification } from '../../../components/interface/Notification/Notification'

interface FormData {
  Username: string
  Password: string
}

export default function LoginForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { refreshAuthState } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: FormData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const result = await handleLoginApi({ username: values.Username, password: values.Password })
    setLoading(false)

    if (result.Status == 'Success') {
      await refreshAuthState()
      navigate('/budget', { replace: true })
    } else if (result.Error == 'User not Found') {
      showNotification({
        type: 'error',
        message: 'Nonexistent User',
        description: 'There is already no such account with this username.',
      })
    } else if (result.Error == 'Incorrect Password') {
      showNotification({
        type: 'warning',
        message: 'Incorrect Password',
        description: "Username and password don't match.",
      })
    } else {
      showNotification({
        type: 'error',
        message: 'Server Error',
        description: 'An error has occured. Please try again later',
      })
    }
  }

  const subheader = location.state?.registrationSuccessRedirect ? 'Account registered successfully. Login now.' : "Don't have an account?"
  const redirect = location.state?.registrationSuccessRedirect ? undefined : { link: '/register', text: 'Sign Up.' }

  return (
    <FormWrapper header='Login' subheader={subheader} redirect={redirect} onFinish={handleSubmit}>
      <BaseInput name='Username' placeholder='Username' usernameInput />
      <PasswordInput name='Password' placeholder='Password' />
      <FormButton loading={loading} halfHeight>
        Login
      </FormButton>
    </FormWrapper>
  )
}
