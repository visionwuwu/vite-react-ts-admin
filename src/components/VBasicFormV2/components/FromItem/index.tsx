import React, {useContext} from 'react'
import {Form, Input, Select, InputNumber, Checkbox, Radio} from 'antd'
import {FormContext} from '../../index'
import {Rule} from 'rc-field-form/lib/interface'

/** 表单项类型 */
export type FormItemType =
  | 'input'
  | 'password'
  | 'select'
  | 'textarea'
  | 'upload'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'checkbox-group'
  | 'radio-group'

export interface IFormItemProps {
  /** 表单项类型 */
  type: FormItemType
  /** label标签文本 */
  label: string
  /** 表单提交项的名称 */
  name: string
  /** 表单项的值 */
  value: any
  /** 表单项额外参数 */
  payload?: any
  /** 表单项验证规则 */
  rules?: Rule[]
}

const FormItem: React.FC<IFormItemProps> = props => {
  const {type, label, name, payload, rules} = props

  /** 获取表单context提供的表单实例 */
  const {form} = useContext(FormContext)

  let valuePropName = undefined

  /** 表单项内容 */
  let formItemContent: React.ReactNode = null
  /** */
  const placeholder = `请${type === 'select' ? '选择' : '输入'}${label}`
  switch (type) {
    case 'textarea':
      formItemContent = <Input.TextArea placeholder={placeholder} allowClear />
      break
    case 'password':
      formItemContent = <Input.Password placeholder={placeholder} allowClear />
      break
    case 'number':
      formItemContent = <InputNumber placeholder={placeholder} />
      break
    case 'checkbox':
      valuePropName = 'checked'
      formItemContent = <Checkbox>{payload}</Checkbox>
      break
    case 'checkbox-group':
      formItemContent = <Checkbox.Group options={payload} />
      break
    case 'radio':
      valuePropName = 'checked'
      formItemContent = <Radio>{payload}</Radio>
      break
    case 'radio-group':
      formItemContent = <Radio.Group options={payload} />
      break
    case 'select':
      formItemContent = payload ? (
        <Select options={payload} placeholder={placeholder} allowClear></Select>
      ) : null
      break
    default:
      formItemContent = <Input placeholder={placeholder} allowClear />
      break
  }

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      valuePropName={valuePropName}
    >
      {formItemContent}
    </Form.Item>
  )
}

export default FormItem
