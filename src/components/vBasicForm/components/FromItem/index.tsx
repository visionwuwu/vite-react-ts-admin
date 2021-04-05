import React, {useCallback} from 'react'
import {Form, Input, Select, InputNumber, Checkbox, Radio} from 'antd'
import {
  InputNumberProps,
  InputProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
} from 'antd'
import FormTreeSelect from '../FormTreeSelect'
import FormTree, {FormTreeOuterProps} from '../FormTree'
import FormIconPicker from '../FormIconPicker'
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
  | 'tree-select'
  | 'tree'
  | 'icon-picker'

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
  /** 当前表单组件的其他属性 */
  othersProps?: InputNumberProps &
    InputProps &
    SelectProps<any> &
    CheckboxProps &
    RadioProps &
    RadioGroupProps &
    FormTreeOuterProps
}

const FormItem: React.FC<IFormItemProps> = props => {
  const {type, label, name, value, payload, rules, othersProps} = props

  let valuePropName = undefined

  /** 表单项内容 */
  let formItemContent: React.ReactNode = null

  const placeholder = `请${type === 'select' ? '选择' : '输入'}${label}`

  const changeValue = useCallback((value: any) => {
    console.log(value)
  }, [])

  switch (type) {
    case 'textarea':
      formItemContent = <Input.TextArea placeholder={placeholder} allowClear />
      break
    case 'password':
      formItemContent = <Input.Password placeholder={placeholder} allowClear />
      break
    case 'number':
      formItemContent = (
        <InputNumber
          placeholder={placeholder}
          {...(othersProps as InputNumberProps)}
        />
      )
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
      formItemContent = <Radio.Group {...(othersProps as RadioGroupProps)} />
      break
    case 'select':
      formItemContent = payload ? (
        <Select options={payload} placeholder={placeholder} allowClear></Select>
      ) : null
      break
    case 'tree-select':
      formItemContent = (
        <FormTreeSelect
          name={name}
          selectValue={value}
          treeData={payload}
          onSelect={changeValue}
        />
      )
      break
    case 'tree':
      formItemContent = (
        <FormTree
          name={name}
          selectValue={value}
          onFormTreeChange={changeValue}
          {...(othersProps as FormTreeOuterProps)}
        />
      )
      break
    case 'icon-picker':
      formItemContent = (
        <FormIconPicker
          name={name}
          selectedIcon={value}
          onSelectedIcon={changeValue}
        />
      )
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
