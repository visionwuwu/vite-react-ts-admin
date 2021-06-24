import React, {Suspense} from 'react'
import {Redirect, Route, Switch, HashRouter} from 'react-router-dom'
import {Login} from 'views/index'
import Layout from '@/layout'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {StoreStateProps} from 'store/reducers'
import {getUserinfo, toggleAppEnterLoading} from 'store/actions'
import {AppLoading} from 'comps/Loading'

type IRouterProps = IProps

const Router: React.FC<IRouterProps> = props => {
  const {
    token,
    roleNames,
    getUserinfo,
    appEnterLoading,
    toggleAppEnterLoading,
  } = props

  return (
    <HashRouter>
      <Suspense fallback={<AppLoading />}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route
            path="/"
            render={props => {
              // 不存在token
              if (!token) {
                return <Redirect to="/login" />
              }

              // 未登录，或者没有权限
              if (!roleNames) {
                toggleAppEnterLoading(true)
                ;(getUserinfo() as any)
                  .then(() => {
                    return <Layout />
                  })
                  .catch(() => {
                    props.history.push('/login')
                  })
                  .finally(() => {
                    toggleAppEnterLoading(false)
                  })
              } else {
                // 用户已登录，并且具有权限，进入系统
                return <Layout />
              }

              // 应用初始时的加载动画
              if (appEnterLoading) {
                return <AppLoading />
              }
            }}
          />
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

// 映射state到组件的props上
const mapStateToProps = (state: StoreStateProps) => ({
  token: state.user.token,
  roleNames: state.user.roleNames,
  appEnterLoading: state.app.appEnterLoading,
})

// 映射dispatch到组件的props上
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getUserinfo,
      toggleAppEnterLoading,
    },
    dispatch,
  )

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Router))
