import React, {createContext, memo, useEffect, useState} from 'react'
import {Layout, Grid, BackTop} from 'antd'
import Content from './Content'
import Sider from './Sider'
import Header from './Header'
import RightPanel from './RightPanel'
import DrawerSider from './DrawerSider'
import {useAppDispatch, useAppSelector} from '../store'
import {setShowSidebar} from '../store/actions'
import {AppLoading} from 'comps/Loading'
const {useBreakpoint} = Grid
import './index.less'

/** 布局Context */
interface LayoutContext {
  lg: boolean | undefined
  drawerVisible: boolean
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const LayoutContext = createContext({} as LayoutContext)

interface IBaseLayoutProps {}

const BaseLayout: React.FC<IBaseLayoutProps> = () => {
  const showSidebar = useAppSelector(state => state.settings.showSidebar)
  const intlLoading = useAppSelector(state => state.app.intlLoading)
  const [drawerVisible, setDrawerVisible] = useState(true)
  const {lg} = useBreakpoint()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setShowSidebar(!!lg))
  }, [lg])

  return (
    <>
      {intlLoading ? <AppLoading /> : null}
      <BackTop visibilityHeight={400} target={() => document.body} />
      <LayoutContext.Provider value={{lg, drawerVisible, setDrawerVisible}}>
        <Layout style={{minHeight: '100%', width: '100%'}}>
          {showSidebar ? <Sider /> : null}
          {!lg ? <DrawerSider /> : null}
          <Layout>
            <Header />
            <Content />
            <RightPanel />
          </Layout>
        </Layout>
      </LayoutContext.Provider>
    </>
  )
}

export default memo(BaseLayout)
