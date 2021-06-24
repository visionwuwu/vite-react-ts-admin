import React, {memo, useContext, useEffect, useState} from 'react'
import {Menu} from 'antd'
import {MenuInfo} from 'rc-menu/lib/interface'
import {Link, useLocation} from 'react-router-dom'
import {
  MenuListProps,
  prevCommonMenuList,
  nextCommonMenuList,
  commonMenuList,
} from '@/config/menuConfig'
import {useAppDispatch, useAppSelector} from 'store/index'
import {addTagsView} from 'store/actions'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import Scrollbars from 'react-custom-scrollbars'
import Icon from 'comps/Icon'
import variables from 'styles/variables.module.less'
import {LayoutContext} from '../../index'
import './index.less'

interface IMenuProps {}

const MenuContainer: React.FC<IMenuProps> = () => {
  const location = useLocation()
  const sidebarCollapsed = useAppSelector(state => state.app.sidebarCollapsed)
  const dispatch = useAppDispatch()
  const {menus} = useContext(LayoutContext)

  const path: string = location.pathname

  const defaultOpenKeys: string[] = []

  const [menuList, setMenuList] = useState<MenuListProps[]>([])

  useEffect(() => {
    setMenuList(
      filterMenu(prevCommonMenuList.concat(menus).concat(nextCommonMenuList)),
    )
  }, [menus])

  useEffect(() => {
    handleMenuSelecte({})
    handleMenuSelecte({key: location.pathname})
  }, [location])

  /** 过滤菜单 */
  const filterMenu = (menuList: MenuListProps[]): MenuListProps[] => {
    let tempMenuList: MenuListProps[] = []
    menuList.forEach(item => {
      if (item.children && item.children.length > 0) {
        const list = filterMenu(item.children)
        if (list.length > 0) {
          item.children = list
          tempMenuList = tempMenuList.concat(item)
        }
      } else {
        tempMenuList = tempMenuList.concat(item)
      }
    })
    return tempMenuList
  }

  /** 生成菜单项 */
  const generatorMenuItem = (item: MenuListProps) => {
    let node = null
    if (item.children && item.children.length > 0) {
      const cItem = item.children.find(c => path.indexOf(c.path) === 0)
      if (cItem) {
        defaultOpenKeys.push(item.path)
      }
      node = (
        <Menu.SubMenu
          title={item.name || item.title}
          key={item.path}
          icon={item.icon && <Icon icon={item.icon as any} />}
        >
          {item.children.map(child => {
            return generatorMenuItem(child)
          })}
        </Menu.SubMenu>
      )
    } else {
      node = (
        <Menu.Item
          key={item.path}
          icon={item.icon && <Icon icon={item.icon as any} />}
        >
          <Link to={item.path}>{item.name || item.title}</Link>
        </Menu.Item>
      )
    }
    return node
  }

  /** 点击侧边栏菜单 */
  const handleMenuSelecte = (menuInfo: Partial<MenuInfo>) => {
    const {key = '/dashboard'} = menuInfo
    /** 公共菜单列表，与用户拥有的菜单列表合并 */
    const finalMenuList = menus.concat(commonMenuList)
    const menuItem = getMenuItemInMenuListByProperty(
      finalMenuList,
      'path',
      key as string,
    )
    if (menuItem) {
      dispatch(
        addTagsView({
          title: menuItem.name || menuItem.title,
          path: menuItem.path,
        }),
      )
    }
  }

  return (
    <div
      className="sidebar-menu-container"
      style={{height: `calc(100% - ${variables['layout-header-top-h']})`}}
    >
      <Scrollbars autoHide>
        {/* <Menu
          mode="inline"
          theme="dark"
          key="/dashboard"
          onSelect={handleMenuSelecte}
          selectedKeys={[path]}
          defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
        >
          <Menu.Item key="/dashboard" icon={<Icon icon="DashboardOutlined" />}>
            <Link to="/dashboard">首页</Link>
          </Menu.Item>
        </Menu>
        <Menu
          mode="inline"
          theme="dark"
          key="/doc"
          onSelect={handleMenuSelecte}
          selectedKeys={[path]}
          defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
        >
          <Menu.Item key="/doc" icon={<Icon icon="FileOutlined" />}>
            <Link to="/doc">文档</Link>
          </Menu.Item>
        </Menu> */}
        {menuList.map(item => {
          return (
            <Menu
              mode="inline"
              theme="dark"
              onSelect={handleMenuSelecte}
              key={item.path}
              selectedKeys={[path]}
              defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
            >
              {generatorMenuItem(item)}
            </Menu>
          )
        })}
        {/* <Menu
          mode="inline"
          theme="dark"
          key="/account"
          onSelect={handleMenuSelecte}
          selectedKeys={[path]}
          defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
        >
          <Menu.SubMenu
            title="个人页"
            key="/account"
            icon={<Icon icon="FormOutlined" />}
          >
            <Menu.Item key="/account/center">
              <Link to="/account/center">个人中心</Link>
            </Menu.Item>
            <Menu.Item key="/account/setting">
              <Link to="/account/setting">个人设置</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Menu
          mode="inline"
          theme="dark"
          key="/about"
          onSelect={handleMenuSelecte}
          selectedKeys={[path]}
          defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
        >
          <Menu.Item key="/about" icon={<Icon icon="UserOutlined" />}>
            <Link to="/about">关于作者</Link>
          </Menu.Item>
        </Menu> */}
      </Scrollbars>
    </div>
  )
}

export default memo(MenuContainer)
