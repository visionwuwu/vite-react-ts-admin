import React, {memo} from 'react'
import {Spin} from 'antd'
import viteSvg from 'assets/images/vite.svg'
import './index.less'

interface IAppLoadingProps {}

const AppLoading: React.FC<IAppLoadingProps> = () => {
  return (
    <div className="app-loading-container">
      <img className="app-loading-logo" src={viteSvg} alt="app-loading" />
      <div className="app-loading-spin-icon">
        <Spin size="large" />
      </div>
      <h1 className="app-loading-title">橙晨燕</h1>
    </div>
  )
}

export default memo(AppLoading)
