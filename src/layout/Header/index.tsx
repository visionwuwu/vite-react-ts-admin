import React, {memo, useContext, useMemo} from 'react'
import {Layout} from 'antd'
import Hamburger from 'comps/Hamburger'
import Breadcrumb from 'comps/Breadcrumb'
import FullScreen from 'comps/FullScreen'
import IntlDropdown from 'comps/IntlDropdown'
import UserAvatarDropdown from 'comps/UserAvatarDropdown'
import Setting from 'comps/Setting'
import {useAppDispatch, useAppSelector} from 'store/index'
import {sidebarCollapsedToggle} from 'store/actions'
import classnames from 'classnames'
import TagsView from '../TagsView'
import {CSSTransition} from 'react-transition-group'
import Logo from '../Sider/Logo'
import {LayoutContext} from '../index'
import {CollapsedMenuBtnPosition} from 'root/src/defaultSetting'
const {Header} = Layout
import './index.less'

interface ILayoutHeaderProps {}

const LayoutHeader: React.FC<ILayoutHeaderProps> = () => {
  const sidebarCollapsed = useAppSelector(state => state.app.sidebarCollapsed)
  const {
    fixHeader,
    openTagsView,
    showBreadcrumb,
    collapsedMenuBtnPosition,
    showSidebar,
  } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()
  const {drawerVisible, setDrawerVisible, lg} = useContext(LayoutContext)

  const classes = classnames('layout-header', {
    'is-fixed': fixHeader,
    'hide-tags': !openTagsView,
  })

  const placeholderClasses = classnames('layout-header', {
    'hide-tags': !openTagsView,
  })

  const headerStyle = useMemo(() => {
    if (!lg) return {width: '100%'}
    if (!showSidebar) return {width: '100%'}
    if (fixHeader) {
      return {
        width: `calc(100vw - ${sidebarCollapsed ? '48px' : '200px'})`,
      }
    }
    return {width: '100%'}
  }, [fixHeader, sidebarCollapsed, lg, showSidebar])

  const handleHamburgerClick = () => {
    dispatch(sidebarCollapsedToggle())
  }

  const renderHamburger = useMemo(() => {
    if (!lg) return null
    return (
      collapsedMenuBtnPosition === CollapsedMenuBtnPosition.top && (
        <Hamburger collapse={sidebarCollapsed} onClick={handleHamburgerClick} />
      )
    )
  }, [collapsedMenuBtnPosition, lg])

  const renderDrawerHamburger = useMemo(() => {
    if (lg) return null
    return (
      <Hamburger
        collapse={drawerVisible}
        onClick={() => setDrawerVisible(!drawerVisible)}
      />
    )
  }, [drawerVisible, setDrawerVisible, lg])

  return (
    <>
      <Header className={classes} style={headerStyle}>
        <div className="layout-header-top">
          <div className="left-menu">
            {!lg && <Logo classNames="bg-white" showTitle={false} />}
            {/* 渲染sidebar */}
            {renderHamburger}
            {/* 渲染抽屉sidebar */}
            {renderDrawerHamburger}
            {showBreadcrumb ? <Breadcrumb /> : null}
          </div>
          <div className="right-menu">
            <FullScreen />
            <IntlDropdown />
            <UserAvatarDropdown />
            <Setting />
          </div>
        </div>
        <CSSTransition
          in={openTagsView}
          timeout={500}
          classNames="fadeIn"
          unmountOnExit
          exit={false}
        >
          <TagsView />
        </CSSTransition>
      </Header>
      {fixHeader ? <Header className={placeholderClasses} /> : null}
    </>
  )
}

export default memo(LayoutHeader)
