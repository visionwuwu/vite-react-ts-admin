import React, {
  forwardRef,
  memo,
  useMemo,
  useImperativeHandle,
  useRef,
  useEffect,
  createContext,
} from 'react'
import {Button, Form, FormInstance} from 'antd'
import VBasicFormItem, {IFormItemProps} from './components/FromItem'
import classnames from 'classnames'
import './index.less'

/** 将组件内部属性暴露到外面 */
export interface FromImperativeProps {
  onFinish: (callback: (values: any) => void) => void
  onReset: (callback: () => void) => void
}

/** 外部传递给表单属性 */
interface IVBasicFormV2Props {
  ref: any
  className?: string
  style?: React.CSSProperties
  formFooter?: React.ReactNode
  formFields: IFormItemProps[]
}

/** 表单context属性 */
interface IFormContext {
  form: FormInstance
}

/** 提供给表单子组件的context */
export const FormContext = createContext<IFormContext>({} as IFormContext)
// eslint-disable-next-line
const VBasicFormV2: React.FC<IVBasicFormV2Props> = forwardRef((props, ref) => {
  // eslint-disable-next-line
  const submitFnRef = useRef((values: any) => {})
  const resetFnRef = useRef<() => void>(() => null)
  /** 获取表单组件实例 */
  const [form] = Form.useForm()
  /** 解构组件属性 */
  const {className, style, formFooter, formFields} = props
  /** 自定义Css class */
  const classes = classnames('vbasic-form', className)
  /** 初始化表单值函数 */
  const initFormValue = useMemo(() => {
    return () => {
      formFields.forEach(field => {
        const {name, value} = field
        form.setFieldsValue({[name]: value})
      })
    }
  }, [formFields])
  /** 初始化表单的值 */
  useEffect(() => {
    initFormValue()
  }, [initFormValue])
  /** 将组件内部属性暴露到外面 */
  useImperativeHandle<unknown, FromImperativeProps>(
    ref,
    () => {
      return {
        onFinish: cb => {
          console.log(222)

          submitFnRef.current = cb
        },
        onReset: cb => {
          resetFnRef.current = cb
        },
      }
    },
    [submitFnRef, resetFnRef],
  )
  /** 处理表单提交 */
  const handleSubmit = useMemo(() => {
    return (values: any) => {
      submitFnRef.current(values)
    }
  }, [submitFnRef])
  /** 处理表单重置 */
  const handleReset = () => {
    form.resetFields()
    resetFnRef.current()
  }
  /** 生成所有FormItem */
  const gereratorFormItems = () => {
    return formFields.map(field => (
      <VBasicFormItem key={field.name} {...field} />
    ))
  }
  /** 生成表单底部内容 */
  const generatorFormFooter = useMemo<React.ReactNode>(() => {
    return (
      formFooter || (
        <Form.Item>
          <Button htmlType="button" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      )
    )
  }, [formFooter])

  return (
    <div className={classes} style={style}>
      <FormContext.Provider
        value={{
          form,
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* FormItem */}
          {gereratorFormItems()}
          {/* 表单底部 */}
          {generatorFormFooter}
        </Form>
      </FormContext.Provider>
    </div>
  )
})

export default memo(VBasicFormV2)
