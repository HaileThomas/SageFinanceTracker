import { ReactNode } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import './BudgetWrapper.css'

interface BudgetWrapperProps {
  header: string
  subheader: string
  loading: boolean
  children: ReactNode
}

export default function BudgetWrapper(props: BudgetWrapperProps) {
  return (
    <div className={`full-page budget-page-container ${props.loading ? 'loading' : ''}`}>
      {props.loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 64, color: 'var(--teal-green)' }} spin />} />
      ) : (
        <>
          <div>
            <p className='header'>{props.header}</p>
            <p className='subheader'>{props.subheader}</p>
          </div>
          {props.children}
        </>
      )}
    </div>
  )
}
