import React from 'react'
import {Provider} from 'react-redux'
import store from 'store/index'
import Router from '@/router/index'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  )
}

export default React.memo(App)
