import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {Input} from 'antd'
import Icon, {IconPicker} from 'comps/Icon'
import {IconPrickerImperativeProps} from 'comps/Icon/IconPicker'
import {FormContext} from '../../index'

interface IFormIconPickerProps {
  /** 表单字段名 */
  name: string
  /** 表单值 */
  selectedIcon: string
  /** 触发选中的事件 */
  onSelectedIcon: (iconName: string) => void
}

const FormIconPicker: React.FC<IFormIconPickerProps> = props => {
  const {name, selectedIcon, onSelectedIcon} = props
  const [innerVal, setInnerVal] = useState(selectedIcon)
  const iconPickerRef = useRef<IconPrickerImperativeProps>(null)

  /** 从context中获取表单实例 */
  const {form, closeFlag} = useContext(FormContext)

  /** 用户监听iconName值发生改变重新设置字段值的effect */
  useEffect(() => {
    form.setFieldsValue({[name]: innerVal})
  }, [form, innerVal])

  /** 弹框关闭重置FormItem字段值，输入框值的effect */
  useEffect(() => {
    /** 拥有初始值 */
    if (selectedIcon) {
      return setInnerVal(selectedIcon)
    }
    setInnerVal('')
  }, [closeFlag])

  /** 打开图标库，选取图标 */
  const handleOpenIconPicker = () => {
    const {openIconPicker} = iconPickerRef.current!
    openIconPicker(iconName => {
      onSelectedIcon(iconName)
      setInnerVal(iconName)
    }, innerVal)
  }

  /** 渲染Input组件后缀，用作展示从图标库选中的图标 */
  const renderAddoAfter = useMemo(() => {
    return innerVal ? (
      <Icon onClick={handleOpenIconPicker} icon={innerVal as any} />
    ) : (
      <span onClick={handleOpenIconPicker}>选择图标</span>
    )
  }, [innerVal])

  return (
    <div>
      <Input value={innerVal} disabled addonAfter={renderAddoAfter} />

      <IconPicker ref={iconPickerRef} />
    </div>
  )
}

export default FormIconPicker
