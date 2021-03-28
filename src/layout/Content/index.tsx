import React, {Suspense} from 'react'
import {Layout} from 'antd'
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom'
import routes, {routeProps} from '@/config/routeMap'
import {connect} from 'react-redux'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Loading from 'comps/Loading'
import {StoreStateProps} from 'store/reducers'
import DocumentTitle from 'react-document-title'
import menuConfig from '@/config/menuConfig'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import defaultSettings from '@/defaultSetting'
import './index.less'

const {Content} = Layout

type ILayoutContentProps = RouteComponentProps

const getPageTitle = (value: string): string => {
  const item = getMenuItemInMenuListByProperty(menuConfig, 'path', value)
  if (item) {
    return item.title + ' - ' + defaultSettings.title
  }
  return defaultSettings.title
}

const LayoutContent: React.FC<ILayoutContentProps & IProps> = props => {
  const {location, roles} = props

  const filterRoute = (route: routeProps) => {
    return (
      !route.roles ||
      roles.includes('admin') ||
      route.roles.some(role => roles.includes(role))
    )
  }

  return (
    <DocumentTitle title={getPageTitle(location.pathname)}>
      <Content
        className="layout-content-container"
        style={{height: 'calc(100vh - 100px)'}}
      >
        <Suspense fallback={<Loading />}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              classNames="fade"
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

const mapStateToProps = (state: StoreStateProps) => ({
  roles: state.user.roles,
})

type IProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(withRouter(LayoutContent))
