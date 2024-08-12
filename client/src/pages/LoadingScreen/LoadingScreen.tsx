import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen(props: LoadingScreenProps) {
  return (
    <div className='full-page center-elements-horizontally stack-elements background-green'>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48, margin: 20 }} spin />}
        tip='Authenticating...'
        size='large'
        spinning={props.isLoading}
        percent='auto'
        fullscreen
      />
    </div>
  )
}
