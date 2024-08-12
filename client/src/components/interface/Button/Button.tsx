import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import './Button.css'
import { Button } from 'antd'

interface ButtonProps {
  children: ReactNode
  onClick?: (value: any) => void
  colorClass: string
  loading?: boolean
  halfHeight?: boolean
  disabled?: boolean
}

interface LinkButtonProps extends ButtonProps {
  link: string
}

interface FormButtonProps extends ButtonProps {}

interface ActionButtonProps extends ButtonProps {
  onClick: (value: any) => void
}

function BaseButton(props: ButtonProps) {
  const buttonClass = `solid-button ${props.halfHeight ? 'skinny-button' : 'full-button'} ${props.colorClass}`

  return (
    <Button className={buttonClass} onClick={props.onClick} loading={props.loading} htmlType='submit' type='default'>
      {props.children}
    </Button>
  )
}

function LinkButton(props: LinkButtonProps) {
  return (
    <Link to={props.link} reloadDocument>
      <BaseButton {...props} />
    </Link>
  )
}

export const MainRedirectButton = (props: Omit<LinkButtonProps, 'colorClass'>) => {
  return <LinkButton {...props} colorClass='teal' />
}

export const ErrorRedirectButton = (props: Omit<LinkButtonProps, 'colorClass'>) => {
  return <LinkButton {...props} colorClass='red' />
}

export const FormButton = (props: Omit<FormButtonProps, 'colorClass'>) => {
  return <BaseButton {...props} colorClass='teal full-width' />
}

export const ActionButton = (props: Omit<ActionButtonProps, 'colorClass'>) => {
  return <BaseButton {...props} colorClass='teal' />
}
