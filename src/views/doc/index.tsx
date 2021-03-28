import {Button} from 'antd'
import React, {useCallback, useEffect, useRef} from 'react'
import TypingCard from 'comps/TypingCard'
import VBasicModal, {ModalImperativeProps} from 'comps/VBasicModal'
import VBasicFormV2, {FromImperativeProps} from 'comps/VBasicFormV2'
import {IFormItemProps} from 'comps/VBasicFormV2/components/FromItem'

interface IDocProps {}

const Doc: React.FC<IDocProps> = () => {
  /** 全局基础弹框引用 */
  const vBasicModalRef = useRef<ModalImperativeProps>()

  const formRef = useRef<FromImperativeProps>()

  const source = React.useMemo(() => {
    return `开发文档请戳这里 <a target="_blank href="http://vite2-vue3-docs.visionwu.top/">vite-vue3-docs</a> 开发文档。 目前正在编写完善中...`
  }, [])

  const handleOpenModal = useCallback(() => {
    // eslint-disable-next-line
    const {openModal, closeModal} = vBasicModalRef.current!
    openModal(() => {
      console.log('ok')
      closeModal()
    })
  }, [vBasicModalRef])

  const formFields: IFormItemProps[] = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      value: '11',
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
    },
    {
      type: 'password',
      label: '密码',
      name: 'password',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
    },
    {
      type: 'number',
      label: '年龄',
      name: 'age',
      value: 6,
      rules: [
        {
          required: true,
          message: '请输入年龄',
        },
      ],
    },
    {
      type: 'select',
      label: '状态',
      name: 'status',
      value: 1,
      rules: [
        {
          required: true,
          message: '请选择状态',
        },
      ],
      payload: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
    {
      type: 'checkbox',
      label: '同意协议',
      name: 'protocol',
      value: true,
      payload: '同意协议',
      rules: [
        {
          required: true,
          message: '请勾选协议',
        },
      ],
    },
    {
      type: 'radio-group',
      label: '性别',
      name: 'sex',
      value: 1,
      payload: [
        {label: '男', value: 1},
        {label: '女', value: 2},
        {label: '未知', value: 0},
      ],
    },
  ]

  useEffect(() => {
    if (formRef.current) {
      const {onFinish, onReset} = formRef.current
      onFinish(values => {
        console.log(values)
      })

      onReset(() => {
        console.log('reset')
      })
    }
  }, [formRef])

  return (
    <div className="app-container">
      <TypingCard title="开发文档" source={source} />

      <VBasicFormV2 ref={formRef} formFields={formFields} />

      <Button type="primary" onClick={handleOpenModal}>
        open modal
      </Button>

      <VBasicModal ref={vBasicModalRef} mask={false} centered />
    </div>
  )
}

export default Doc
