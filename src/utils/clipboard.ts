import {message} from 'antd'
import ClipboardJS from 'clipboard'

function clipboardSuccess() {
  message.success('复制成功')
}

function clipboardError() {
  message.error('复制失败')
}

interface ClipboardProps {
  onClick?: (e: MouseEvent) => void
}

export default function handleClipboard(text: string, event: any): void {
  const clipboard: ClipboardJS & ClipboardProps = new ClipboardJS(
    event.target,
    {
      text: () => text,
    },
  )
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick && clipboard.onClick(event)
}
