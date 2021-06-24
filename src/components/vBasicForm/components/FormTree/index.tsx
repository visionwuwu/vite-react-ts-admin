import React, {useContext, useEffect, useState} from 'react'
import {Input} from 'antd'
import VBasictree, {IVBasicTreeProps} from '../../../VBasicTree'
import {FormContext} from '../../index'
import {deepMerge} from 'utils/utils'
import {Key} from 'rc-tree/lib/interface'

/** 剔除一些属性 */
export type filterProps =
  | 'checkedKeys'
  | 'onCheck'
  | 'onSelect'
  | 'selectedKeys'

export type FormTreeOuterProps = Partial<Omit<IVBasicTreeProps, filterProps>>

/** 提供FormTree组件内部的属性 */
interface IFormTreeProps extends FormTreeOuterProps {
  /** 表单字段名称 */
  name: string
  /** 表单值 */
  selectValue: Key[]
  /** 选中节点值发生改变的回调 */
  onFormTreeChange: (keys: Key[], type: 'check' | 'select') => void
}

/** 默认基础树形控件配置项 */
const defaultBasicTreeOptions: IVBasicTreeProps = {
  /** 组件上方标题 */
  title: 'BasicTitle',
  treeData: [],
  /** 是否可选中 */
  selectable: false,
  /** 是否显示搜索框 */
  showSearch: false,
  /** 节点前添加 Checkbox 复选框 */
  checkable: true,
  /** 是否展示 TreeNode title 前的图标 */
  showIcon: true,
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly: true,
}

type onSelectFnType = (selectedKeys: Key[]) => void

type onCheckFnType = (checked: Key[]) => void

const FormTree: React.FC<IFormTreeProps> = props => {
  /** 解构组件的props */
  const {
    name,
    selectValue,
    onFormTreeChange,
    checkable,
    selectable,
    ...restProps
  } = props
  /** 选中复选框选中的值 */
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(selectValue || [])
  /** 点击选中树节点的值 */
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(selectValue || [])

  /** FormTree容器内联样式 */
  const style: React.CSSProperties = {
    height: '250px',
    minHeight: '250px',
  }

  /** 与默认配置项合并 */
  const options = deepMerge(defaultBasicTreeOptions, restProps)

  /** FormContext */
  const {form, closeFlag} = useContext(FormContext)

  /** 处理点击树节点触发的回调 */
  const handleSelect: onSelectFnType = keys => {
    if (!selectable) return
    form.setFieldsValue({[name]: keys})
    setSelectedKeys(keys)
    onFormTreeChange(keys, 'select')
  }

  /** 点击复选框触发的回调 */
  const handleCheck: onCheckFnType = keys => {
    if (!checkable) return
    form.setFieldsValue({[name]: keys})
    setCheckedKeys(keys)
    onFormTreeChange(keys, 'check')
  }

  /** 监听modal是否关闭，如果关闭就重置树的数据 */
  useEffect(() => {
    if (selectValue && selectValue.length) {
      return setCheckedKeys(selectValue)
    }

    if (checkable) {
      setCheckedKeys([])
    }
    if (selectable) {
      setSelectedKeys([])
    }
  }, [closeFlag])

  return (
    <div style={style}>
      <Input type="hidden" />
      <VBasictree
        {...options}
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        checkable={checkable}
        selectable={selectable}
        onSelect={handleSelect}
        onCheck={handleCheck}
      />
    </div>
  )
}

FormTree.defaultProps = defaultBasicTreeOptions

export default FormTree
