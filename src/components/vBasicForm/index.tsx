import React, {useEffect, useMemo, createContext} from 'react'
import {Row, Col, Button, Form} from 'antd'
import {FormLayout, FormInstance} from 'antd/lib/form/Form'
import VBasicFormItem, {IFormItemProps} from './components/FromItem'
import classnames from 'classnames'
import './index.less'

export interface IVBasicFormProps {
  layout?: FormLayout
  style?: React.CSSProperties
  className?: string
  onFinish: (values: any) => void
  onReset: () => void
  formItems: IFormItemProps[]
  loading?: boolean
}

export interface VBasicFormContext {
  form: FormInstance
  closeFlag?: boolean
}

export const FormContext = createContext<VBasicFormContext>(
  {} as VBasicFormContext,
)

const VBasicForm: React.FC<IVBasicFormProps> = props => {
  /** 解构组件的props */
  const {
    className,
    style,
    layout,
    onFinish,
    onReset,
    formItems,
    loading,
  } = props

  /** 获取表单实例 */
  const [form] = Form.useForm()

  /** 自定义Css class */
  const classes = classnames('vbasic-form-wrapper', className)

  /** 处理表单提交 */
  const handleSubmit = (values: any) => {
    onFinish && onFinish!(values)
  }

  /** 处理表单重置 */
  const handleReset = () => {
    form.resetFields()
    onReset && onReset()
  }

  /** 初始化表单值 */
  const initFormValue = useMemo(() => {
    return () => {
      formItems.forEach(field => {
        const {name, value} = field
        form.setFieldsValue({[name]: value || ''})
      })
    }
  }, [formItems, form])

  useEffect(() => {
    initFormValue()
  }, [initFormValue])

  /** 生成FormItem */
  const generatorFormItems = useMemo(() => {
    return formItems.map((item, index) => {
      return (
        <Col span={8} key={index}>
          <VBasicFormItem key={item.name} {...item} />
        </Col>
      )
    })
  }, [formItems])

  /** 自定义表单底部内容 */
  const gereratorFormFooter = useMemo(() => {
    return (
      <Col span={8} key="operation">
        <Form.Item style={{textAlign: 'right'}}>
          <Button className="reset-btn" htmlType="button" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
        </Form.Item>
      </Col>
    )
  }, [loading, handleReset])

  return (
    <div className={classes} style={style}>
      <FormContext.Provider
        value={{
          form,
        }}
      >
        <Form
          className="vbasic-form"
          layout={layout}
          onFinish={handleSubmit}
          form={form}
          autoComplete="off"
        >
          <Row>
            {generatorFormItems}
            {gereratorFormFooter}
          </Row>
        </Form>
      </FormContext.Provider>
    </div>
  )
}

VBasicForm.defaultProps = {
  layout: 'inline',
  loading: false,
}

export default React.memo(VBasicForm)
