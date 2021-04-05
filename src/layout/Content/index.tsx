import React, {memo, Suspense} from 'react'
import {Layout} from 'antd'
import {Switch, Route, Redirect, useLocation} from 'react-router-dom'
import routes, {routeProps} from '@/config/routeMap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Loading from 'comps/Loading'
import {useAppSelector} from 'store/index'
import DocumentTitle from 'react-document-title'
import menuConfig from '@/config/menuConfig'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import defaultSettings from '@/defaultSetting'
const {Content} = Layout
import './index.less'

interface ILayoutContentProps {}

const getPageTitle = (value: string): string => {
  const item = getMenuItemInMenuListByProperty(menuConfig, 'path', value)
  if (item) {
    return item.title + ' - ' + defaultSettings.title
  }
  return defaultSettings.title
}

const LayoutContent: React.FC<ILayoutContentProps> = () => {
  const location = useLocation()
  const roles = useAppSelector(state => state.user.roles)

  const filterRoute = (route: routeProps) => {
    return (
      !route.roles ||
      roles.includes('admin') ||
      route.roles.some(role => roles.includes(role))
    )
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
                {routes.map((route, index) => {
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
