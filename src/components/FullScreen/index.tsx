import React, {useEffect, useState, RefObject} from 'react'
import {FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons'
import screenfull, {Screenfull} from 'screenfull'
import {message, Tooltip} from 'antd'
import classnames from 'classnames'
import {isElement} from 'utils/utils'
import './index.less'

interface IFullScreenProps {
  /** 外层容器内联样式 */
  wrapperStyle?: React.CSSProperties
  /** 外层容器自定义 Css class */
  wrapperClassName?: string
  /** 图标内联样式 */
  style?: React.CSSProperties
  /** 图标自定义 Css class */
  className?: string
  /** 图标字体大小 */
  size?: number
  /** 图标字体颜色 */
  color?: string
  /** 全屏元素 */
  target?: Element | RefObject<Element>
}

const ScreenFull: Screenfull = screenfull as Screenfull

const FullScreen: React.FC<IFullScreenProps> = props => {
  const {
    className,
    style,
    wrapperClassName,
    wrapperStyle,
    size,
    color,
    target,
  } = props

  const [isfullScreen, setIsFullScreen] = useState(false)

  const wrapClasses = classnames('fullscreen-container', wrapperClassName)

  const classes = classnames(className)

  const iconStyle: React.CSSProperties = {
    fontSize: `${size}px`,
    color: color,
    fill: color,
    ...style,
  }

  const toggleFullScreen = () => {
    if (!ScreenFull.isEnabled) {
      message.warning('Failed to enable fullscreen')
      return false
    }
    if (isElement(target)) {
      ScreenFull.toggle(target)
    } else {
      if (target) {
        ScreenFull.toggle(target.current as Element)
      }
    }
  }

  const onChange = () => {
    setIsFullScreen(ScreenFull.isFullscreen)
  }

  useEffect(() => {
    ScreenFull.isEnabled && ScreenFull.on('change', onChange)
    return () => {
      ScreenFull.off('change', onChange)
    }
  })

  const title = isfullScreen ? '取消全屏' : '全屏'

  return (
    <div
      className={wrapClasses}
      style={wrapperStyle}
      onClick={e => e.stopPropagation()}
    >
      <Tooltip placement="bottom" title={title}>
        {isfullScreen ? (
          <FullscreenExitOutlined
            style={iconStyle}
            className={classes}
            onClick={toggleFullScreen}
          />
        ) : (
          <FullscreenOutlined
            style={iconStyle}
            className={classes}
            onClick={toggleFullScreen}
          />
        )}
      </Tooltip>
    </div>
  )
}

FullScreen.defaultProps = {
  size: 25,
  color: '#595959',
  target: document.documentElement,
}

export default FullScreen
