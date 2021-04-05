import React, {CSSProperties} from 'react'
import AntIcons, {IconName} from '../data/AntIcons'

/** Icon组件属性类型定义 */
interface IIconProps extends React.HTMLProps<HTMLSpanElement> {
  /** 设置图标的样式，例如 fontSize 和 color */
  style?: CSSProperties
  /** 设置图标的样式名 */
  className?: string
  /** 图标名称 */
  icon: IconName
  /** 图标颜色 */
  color?: string
  /** 图标大小 */
  size?: number
  /** 图标是否有旋转动画 */
  spin?: boolean
  /** 图标旋转角度 */
  rotate?: number
  /** 设置双色图标的颜色 */
  twoToneColor?: string
}

const Icon: React.FC<IIconProps> = props => {
  const {icon, color, size, style, ...restProps} = props

  const iconStyle: CSSProperties = {
    color: color,
    fontSize: size + 'px',
    fill: color,
    ...style,
  }

  const component = AntIcons[icon]

  if (!component) return null

  return component.type.render({
    style: iconStyle,
    ...restProps,
  })
}

Icon.defaultProps = {
  size: 14,
  spin: false,
}

export default Icon
