import React, {
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  memo,
  useMemo,
} from 'react'
import {Button, Modal, ModalProps} from 'antd'
import classnames from 'classnames'
import './index.less'

/** 点击确认按钮的回调函数 */
interface OnOK {
  (): void
}

/** 将组件内部的一些属性或方法暴露到组件外面 */
export interface ModalImperativeProps {
  /** 打开弹框的函数 */
  openModal: (onOk: OnOK, content?: string | React.ReactNode) => void
  /** 关闭弹框的函数 */
  closeModal: () => void
}

/** 从ModalProps剔除一些属性 */
type ModalWithoutProps = 'onOk' | 'onCancel' | 'title' | 'content' | 'footer'

interface IVBasicModalProps extends Omit<ModalProps, ModalWithoutProps> {
  /** basicModal组件引用实例 */
  ref: any
  /** 弹框标题 */
  title?: React.ReactNode | string
  /** 弹框提示内容 */
  content?: React.ReactNode | string
  /** 自定义弹框底部内容 */
  customFooter?: React.ReactNode
  /** 自定义 Css class */
  className?: string
  /** 自定义Css 内联样式 */
  style?: React.CSSProperties
}
// eslint-disable-next-line
const VBasicModal: React.FC<IVBasicModalProps> = forwardRef((props, ref) => {
  /** 解构组件的属性 */
  const {title, className, style, content, customFooter, ...restProps} = props
  const contentRef = useRef<string | React.ReactNode>()
  /** 保存外部传递的确认回调函数 */
  const handleOkRef = useRef<OnOK>(() => null)
  /** 组件内部向外抛出的数据 */
  useImperativeHandle<unknown, ModalImperativeProps>(ref, () => ({
    openModal: (onOk, content) => {
      setVisiable(true)
      contentRef.current = content
      handleOkRef.current = onOk
    },
    closeModal: () => {
      setVisiable(false)
    },
  }))
  /** 组件的class类 */
  const classes = classnames('vbasic-modal', className)
  /** 弹框显示/隐藏状态 */
  const [visiable, setVisiable] = useState(false)

  /** 内部关闭弹框 */
  const handleCancelModal = useCallback(() => {
    setVisiable(false)
  }, [])
  /** 弹框确认 */
  const handleOkModal = useCallback(() => {
    handleOkRef.current()
  }, [])

  /** 生成弹框底部内容 */
  const generatorFooter = useMemo<React.ReactNode>(() => {
    return (
      customFooter || (
        <div>
          <Button onClick={handleCancelModal}>取消</Button>
          <Button type="primary" onClick={handleOkModal}>
            确认
          </Button>
        </div>
      )
    )
  }, [customFooter])

  return (
    <Modal
      {...restProps}
      className={classes}
      style={style}
      title={title}
      visible={visiable}
      closable
      onCancel={handleCancelModal}
      footer={generatorFooter}
    >
      {contentRef.current || content}
    </Modal>
  )
})

VBasicModal.defaultProps = {
  title: '基础通用弹框',
  content: '确认执行该操作？',
}

export default memo(VBasicModal)
