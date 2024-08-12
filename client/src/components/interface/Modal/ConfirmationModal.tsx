import { Modal } from 'antd'

interface ModalProps {
  title: string
  content: string
  onOk: () => Promise<void>
  onCancel?: () => void
}

export const showConfirmModal = ({ title, content, onOk, onCancel }: ModalProps) => {
  Modal.confirm({
    title,
    content,
    async onOk() {
      await onOk()
    },
    onCancel: onCancel || (() => {}),
  })
}
