import { ReactNode } from 'react'
import { Form } from 'antd'
import './FormWrapper.css'
import { Link } from 'react-router-dom'

interface FormWrapperProps {
  header: string
  subheader: string
  redirect?: {
    text: string
    link: string
  }
  onFinish: (values: any) => void
  children: ReactNode
}

export default function FormWrapper(props: FormWrapperProps) {
  return (
    <Form className='form-wrapper stack-elements-evenly' onFinish={props.onFinish}>
      <p className='header'> {props.header} </p>
      <p className='subheader'>
        {props.subheader}
        {props.redirect && <Link to={props.redirect?.link}> {props.redirect?.text} </Link>}
      </p>
      {props.children}
    </Form>
  )
}
