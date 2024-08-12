import { Form, Input } from 'antd'
import './Input.css'
import {
  confirmationInputRules,
  passwordInputRules,
  requiredInputRules,
  usernameInputRules,
} from './validation'

interface InputProps {
  name: string
  placeholder: string
  halfWidth?: boolean
  width?: number
}

interface BaseInputProps extends InputProps {
  usernameInput?: boolean
}

interface PasswordInputProps extends InputProps {
  confirmationInput?: boolean
}

export function BaseInput(props: BaseInputProps) {
  return (
    <Form.Item
      name={props.name}
      style={{ width: props.halfWidth ? '49.5%' : '100%' }}
      validateTrigger='onBlur'
      rules={props.usernameInput ? usernameInputRules : requiredInputRules}
    >
      <Input
        placeholder={props.placeholder}
        size='large'
        variant='filled'
        className='form-input'
      />
    </Form.Item>
  )
}

export function PasswordInput(props: PasswordInputProps) {
  return (
    <Form.Item
      name={props.name}
      style={{ width: props.halfWidth ? '49.5%' : '100%' }}
      validateTrigger='onBlur'
      rules={
        props.confirmationInput ? confirmationInputRules : passwordInputRules
      }
    >
      <Input.Password
        placeholder={props.placeholder}
        size='large'
        variant='filled'
        className='form-input'
      />
    </Form.Item>
  )
}
