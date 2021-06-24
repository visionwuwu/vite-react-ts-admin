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
import {treeDataTranslate} from '../utils'
import {findRoutes} from '../api/menu'
import {MenuListProps} from '../config/menuConfig'
const {useBreakpoint} = Grid
import './index.less'

/** 布局Context */
interface LayoutContext {
  /** 大屏断点 */
  lg: boolean | undefined
  /** 是否显示抽屉菜单 */
  drawerVisible: boolean
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>
  /** 侧边栏菜单 */
  menus: MenuListProps[]
  /** 系统路由 */
  routes: any[] | null
}

export const LayoutContext = createContext({} as LayoutContext)

interface IBaseLayoutProps {}

const BaseLayout: React.FC<IBaseLayoutProps> = () => {
  const showSidebar = useAppSelector(state => state.settings.showSidebar)
  const intlLoading = useAppSelector(state => state.app.intlLoading)
  const [drawerVisible, setDrawerVisible] = useState(true)
  const [menus, setMenus] = useState([])
  const [routes, setRoutes] = useState(null)
  const {lg} = useBreakpoint()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setShowSidebar(!!lg))
  }, [lg])

  /** 获取系统路由，菜单 */
  useEffect(() => {
    findRoutes<any>().then(res => {
      const {data} = res
      if (data.code === 20000) {
        const list = data.data
        const treeMenus: any = treeDataTranslate(list)
        setRoutes(list)
        setMenus(treeMenus)
      }
    })
  }, [])

  return (
    <>
      {/* 切换语言加载动画 */}
      {intlLoading ? <AppLoading /> : null}
      {/* 系统返回顶部组件 */}
      <BackTop visibilityHeight={400} target={() => document.body} />
      <LayoutContext.Provider
        value={{lg, drawerVisible, setDrawerVisible, menus, routes}}
      >
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
