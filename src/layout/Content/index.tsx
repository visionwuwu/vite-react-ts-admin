import React, {memo, Suspense, useContext} from 'react'
import {Layout} from 'antd'
import {Switch, Route, Redirect, useLocation} from 'react-router-dom'
import routesConfig, {routeProps} from '@/config/routeMap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Loading from 'comps/Loading'
import {useAppSelector} from 'store/index'
import DocumentTitle from 'react-document-title'
import MenuList from '@/config/menuConfig'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import defaultSettings from '@/defaultSetting'
import {LayoutContext} from '../index'
const {Content} = Layout
import './index.less'

interface ILayoutContentProps {}

const getPageTitle = (value: string): string => {
  const item = getMenuItemInMenuListByProperty(MenuList, 'path', value)
  if (item) {
    return item.title + ' - ' + defaultSettings.title
  }
  return defaultSettings.title
}

const LayoutContent: React.FC<ILayoutContentProps> = () => {
  const location = useLocation()
  const {permissions} = useAppSelector(state => state.user)
  const {routes} = useContext(LayoutContext)

  const superdmin_permission = '*:*:*'

  /**
   * 用户拥有的路由(routes)，与路由表(routesConfig)中进行比对筛选
   * 1. 无需权限
   * 2. 拥有超级管理员权限 '*:*:*'
   * 3. 用户拥有当前路由
   */
  const filterRoute = (route: routeProps) => {
    return (
      route.notAuth ||
      permissions.includes(superdmin_permission) ||
      (routes &&
        routes.find(item => {
          return item.path === route.path
        }))
    )
  }

  /** 异步获取到路由前先不渲染页面 */
  if (!routes) {
    return null
  }

  return (
    <DocumentTitle title={getPageTitle(location.pathname)}>
      <Content className="layout-content-container">
        <Suspense fallback={<Loading />}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              classNames="fadeInLeft"
              exit={false}
            >
              <Switch location={location}>
                {routesConfig.map((route, index) => {
                  return filterRoute(route) ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={!route.noExtra}
                      component={route.component}
                    />
                  ) : null
                })}
                <Redirect to="/dashboard" from="/" exact />
                <Redirect to="/error/404" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </Content>
    </DocumentTitle>
  )
}

export default memo(LayoutContent)
