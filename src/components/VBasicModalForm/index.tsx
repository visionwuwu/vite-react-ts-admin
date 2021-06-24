import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MouseEvent,
  useEffect,
} from 'react'
import {Modal, ModalProps, Form, Button} from 'antd'
import Icon from 'comps/Icon'
import VBasicFormItem, {IFormItemProps} from '../vBasicForm/components/FromItem'
import {FormContext} from '../vBasicForm/index'
import classnames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
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
    // const setFormItemFieldsValue = (
    //   item: IFormItemProps,
    //   form: FormInstance,
    // ) => {
    //   return
    // }

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

    /** 关闭后重置表单 */
    useEffect(() => {
      if (closeFlag) {
        form.resetFields()
      }
    }, [closeFlag])

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
            <Icon
              icon="FullscreenExitOutlined"
              className="fullscreen-icon"
              onClick={toggleFullScreen}
            />
          ) : (
            <Icon
              icon="FullscreenOutlined"
              className="fullscreen-icon"
              onClick={toggleFullScreen}
            />
          )}
          <Icon icon="CloseOutlined" className="mx-3" />
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

    /* eslint-disable-next-line */
    if (ref && !(ref as any).current) {
      return null
    }

    return (
      <Modal
        title={modalTitle}
        width={620}
        wrapClassName={wrapperClasses}
        visible={visible}
        footer={generatorFooter}
        closeIcon={renderIconClose()}
        onCancel={handleCloseModalForm}
        {...restProps}
      >
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMax={450}
          autoHeightMin={450}
          autoHideTimeout={500}
          thumbSize={60}
        >
          <FormContext.Provider value={{form, closeFlag}}>
            <Form
              labelAlign="right"
              labelCol={{span: 4}}
              form={form}
              autoComplete="off"
            >
              {generatorFormItems()}
            </Form>
          </FormContext.Provider>
        </Scrollbars>
      </Modal>
    )
  },
)

VBasicModalForm.defaultProps = {
  formItems: [],
}

export default memo(VBasicModalForm)
