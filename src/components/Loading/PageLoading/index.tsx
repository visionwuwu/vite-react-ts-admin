import React, {useEffect, CSSProperties, memo} from 'react'
import {Spin} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner: false})

interface IPageLoadingProps {}

const PageLoading: React.FC<IPageLoadingProps> = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])

  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '300px',
  }

  return (
    <div className="app-container">
      <Spin style={style} size="large" />
    </div>
  )
}

export default memo(PageLoading)
