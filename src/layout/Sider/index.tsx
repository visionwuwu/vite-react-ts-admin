import React, {memo, useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'store/index'
import {sidebarCollapsedToggle} from 'store/actions'
import {Layout} from 'antd'
import Logo from './Logo'
import Menu from './Menu'
import {CSSTransition} from 'react-transition-group'
import variables from 'styles/variables.module.less'
import classnames from 'classnames'
const {Sider} = Layout
import {CollapsedMenuBtnPosition} from 'root/src/defaultSetting'
import './index.less'

interface ILayoutSiderProps {}

const LayoutSider: React.FC<ILayoutSiderProps> = () => {
  const sidebarCollapsed = useAppSelector(state => state.app.sidebarCollapsed)
  const {showLogo, fixSidebar, collapsedMenuBtnPosition} = useAppSelector(
    state => state.settings,
  )
  const collapsedWidth = parseInt(variables['layout-sidebar-collapsed-w'])
  const width = parseInt(variables['layout-sidebar-w'])
  const dispatch = useAppDispatch()
  /** 展位的sider Css 类 */
  const classes = classnames('layout-sidebar-container', {
    'is-collapsed': sidebarCollapsed,
  })

  /** 显示的sider Css 类*/
  const sidebarClasses = classnames(classes, {
    'is-fixed': fixSidebar,
  })

  const sidebarProps: any = {
    collapsed: sidebarCollapsed,
    collapsedWidth: collapsedWidth,
    width: width,
  }

  const collapsed = collapsedMenuBtnPosition === CollapsedMenuBtnPosition.bottom

  const handleCollapse = useCallback(() => {
    dispatch(sidebarCollapsedToggle())
  }, [dispatch, sidebarCollapsedToggle])

  return (
    <>
      {/* sidebar展位 */}
      {fixSidebar ? <Sider {...sidebarProps} className={classes} /> : null}
      <Sider
        {...sidebarProps}
        className={sidebarClasses}
        collapsible={collapsed}
        onCollapse={handleCollapse}
      >
        <CSSTransition
          in={showLogo}
          timeout={500}
          classNames="fadeIn"
          unmountOnExit
          exit={false}
        >
          <Logo showTitle={!sidebarCollapsed} />
        </CSSTransition>
        <Menu />
      </Sider>
    </>
  )
}

export default memo(LayoutSider)
