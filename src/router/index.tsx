import React, {Suspense} from 'react'
import {Spin} from 'antd'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Login} from 'views/index'
import Layout from '@/layout'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {StoreStateProps} from 'store/reducers'
import {getUserinfo} from 'store/actions'

type IRouterProps = IProps

const Router: React.FC<IRouterProps> = props => {
  const {token, roles, getUserinfo} = props

  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />
              } else {
                if (!roles || roles.length === 0) {
                  ;(getUserinfo(token) as any).then(() => <Layout />)
                } else {
                  return <Layout />
                }
              }
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

// 映射state到组件的props上
const mapStateToProps = (state: StoreStateProps) => ({
  token: state.user.token,
  roles: state.user.roles,
})

// 映射dispatch到组件的props上
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getUserinfo,
    },
    dispatch,
  )

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Router))
