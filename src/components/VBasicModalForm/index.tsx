import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MouseEvent,
} from 'react'
import {Modal, ModalProps, Form, Button, FormInstance} from 'antd'
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import VBasicFormItem, {IFormItemProps} from '../vBasicForm/components/FromItem'
import {FormContext} from '../vBasicForm/index'
import classnames from 'classnames'
import './index.less'

/** 打开弹框表单的回调 */
type OpenModalFormFn = (
  submitCallback: (values: any) => void,
  editData?: any,
) => void

/** 暴露到组件外部的属性类型定义 */
export interface ModalFormImperativeProps {
  openModalForm: OpenModalFormFn
  closeModalForm: () => void
}

/** 弹框表单属性定义 */
interface IVBasicModalFormProps extends ModalProps {
  ref: any
  title?: string
  formItems: IFormItemProps[]
  cusformFooter?: React.ReactNode
}

const VBasicModalForm: React.FC<IVBasicModalFormProps> = forwardRef(
  (props, ref) => {
    /** 解构组件props */
    const {title, formItems, cusformFooter, wrapClassName, ...restProps} = props

    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [closeFlag, setCloseFlag] = useState(false)
    // eslint-disable-next-line
    const submitFnRef = useRef((values: any) => {})
    const [editData, setEditData] = useState<any>(null)
    const [isfullScreen, setIsFullScreen] = useState(false)

    /** 弹框外出class */
    const wrapperClasses = classnames(wrapClassName, {
      'fullscreen-modal': isfullScreen,
    })

    /** 弹框标题 */
    const modalTitle = useMemo(() => {
      return (editData ? '修改' : '添加') + title
    }, [title, editData])

    /** 处理关闭弹框 */
    const handleCloseModalForm = () => {
      setVisible(false)
      setCloseFlag(c => !c)
    }

    /** 处理点击确认 */
    const handleOkModalForm = () => {
      form.validateFields().then(values => {
        submitFnRef.current(values)
        setVisible(false)
        setCloseFlag(c => !c)
      })
    }

    /** 处理切换全屏 */
    const toggleFullScreen = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      setIsFullScreen(f => !f)
    }

    /** 初始化表单项的值 */
    const setFormItemFieldsValue = (
      item: IFormItemProps,
      form: FormInstance,
    ) => {
      return
    }

    /** 生成最终有用的FormItem字段 */
    const generatorFormFields = useMemo(() => {
      return formItems.map(item => {
        const {name, value} = item
        /** 编辑数据 */
        if (editData) {
          form.setFieldsValue({[name]: editData![name]})
          return {...item, value: editData![name]}
        }
        /** 新增数据 */
        form.setFieldsValue({[name]: value || ''})
        return {...item, value: value || ''}
      })
    }, [editData, formItems, closeFlag])

    /** 生成表单items */
    const generatorFormItems = () => {
      return generatorFormFields.map(item => {
        return <VBasicFormItem key={item.name} {...item} />
      })
    }

    /** 生成弹框footer */
    const generatorFooter = useMemo<React.ReactNode>(() => {
      return (
        cusformFooter || (
          <div>
            <Button onClick={handleCloseModalForm}>取消</Button>
            <Button type="primary" onClick={handleOkModalForm}>
              确认
            </Button>
          </div>
        )
      )
    }, [])

    /** 自定义关闭图标 */
    const renderIconClose = () => {
      return (
        <div className="close-icon-wrapper">
          {isfullScreen ? (
            <FullscreenExitOutlined
              className="fullscreen-icon"
              onClick={toggleFullScreen}
            />
          ) : (
            <FullscreenOutlined
              className="fullscreen-icon"
              onClick={toggleFullScreen}
            />
          )}
          <CloseOutlined className="mx-3" />
        </div>
      )
    }

    /** 暴露到组件外部的属性，可通过组件xxx.current拿到 */
    useImperativeHandle<unknown, ModalFormImperativeProps>(ref, () => {
      return {
        openModalForm: (submitCallback, editData) => {
          setEditData(editData)
          submitFnRef.current = submitCallback
          setVisible(true)
        },
        closeModalForm: () => {
          setVisible(false)
        },
      }
    })

    return (
      <Modal
        title={modalTitle}
        width={520}
        wrapClassName={wrapperClasses}
        visible={visible}
        footer={generatorFooter}
        closeIcon={renderIconClose()}
        onCancel={handleCloseModalForm}
        {...restProps}
      >
        <FormContext.Provider value={{form, closeFlag}}>
          <Form
            labelAlign="right"
            labelCol={{span: 5}}
            form={form}
            autoComplete="off"
          >
            {generatorFormItems()}
          </Form>
        </FormContext.Provider>
      </Modal>
    )
  },
)

VBasicModalForm.defaultProps = {
  formItems: [],
}

export default memo(VBasicModalForm)
