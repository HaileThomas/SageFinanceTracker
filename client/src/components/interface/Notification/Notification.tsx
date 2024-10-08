import { notification } from 'antd'

interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  description: string
}

export const showNotification = ({ type, message, description }: NotificationProps) => {
  notification[type]({
    message,
    description,
  })
}
