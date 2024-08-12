import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleRegisterApi } from '../../../api/authentication'
import { BaseInput, PasswordInput } from '../../../components/interface/Form/Input/Input'
import FormWrapper from '../../../components/interface/Form/FormWrapper'
import { FormButton } from '../../../components/interface/Button/Button'
import { showNotification } from '../../../components/interface/Notification/Notification'

interface FormData {
  FirstName: string
  LastName: string
  Username: string
  Password: string
  ConfirmPassword: string
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: FormData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const result = await handleRegisterApi({ firstname: values.FirstName, lastname: values.LastName, username: values.Username, password: values.Password })
    setLoading(false)

    if (result.Status == 'Success') {
      navigate('/login', { state: { registrationSuccessRedirect: true } })
    } else if (result.Error == 'User already exists') {
      showNotification({
        type: 'warning',
        message: 'Conflicting User',
        description: 'There is already an account with this username.',
      })
    } else {
      showNotification({
        type: 'error',
        message: 'Server Error',
        description: 'An error has occured. Please try again later',
      })
    }
  }

  return (
    <FormWrapper header='Register' subheader='Already have an account?' redirect={{ link: '/login', text: 'Login.' }} onFinish={handleSubmit}>
      <div className='justify-elements-horizontally'>
        <BaseInput name='FirstName' placeholder='First Name' halfWidth />
        <BaseInput name='LastName' placeholder='Last Name' halfWidth />
      </div>
      <BaseInput name='Username' placeholder='Username' usernameInput />
      <PasswordInput name='Password' placeholder='Password' />
      <PasswordInput name='Confirm Password' placeholder='Confirm Password' confirmationInput />
      <FormButton loading={loading} halfHeight>
        Register
      </FormButton>
    </FormWrapper>
  )
}
