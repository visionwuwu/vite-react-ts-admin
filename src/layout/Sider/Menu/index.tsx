import React, {memo, useEffect, useState} from 'react'
import {Menu} from 'antd'
import {MenuInfo} from 'rc-menu/lib/interface'
import {Link, useLocation} from 'react-router-dom'
import Icon, {createFromIconfontCN} from '@ant-design/icons'
import menuConfig, {MenuConfig, iconEnmu} from '@/config/menuConfig'
import defaultSettings from '@/defaultSetting'
import {isImg, isUrl} from 'utils/utils'
import {useAppDispatch, useAppSelector} from 'store/index'
import {RoleName} from '@/config/routeMap'
import {addTagsView} from 'store/actions'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import Scrollbars from 'react-custom-scrollbars'
import variables from 'styles/variables.module.less'
import './index.less'

interface IMenuProps {}

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
})

const getIcon = (icon?: string | React.ReactNode): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      )
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />
    }
  }
  return icon
}

const MenuContainer: React.FC<IMenuProps> = () => {
  const location = useLocation()
  const roles = useAppSelector(state => state.user.roles)
  const sidebarCollapsed = useAppSelector(state => state.app.sidebarCollapsed)
  const dispatch = useAppDispatch()

  const path: string = location.pathname

  const defaultOpenKeys: string[] = []

  const [menuList, setMenuList] = useState<MenuConfig[]>([])

  useEffect(() => {
    setMenuList(filterMenu(menuConfig, roles))
  }, [roles])

  useEffect(() => {
    handleMenuSelecte({})
    handleMenuSelecte({key: location.pathname})
  }, [location])

  const filterMenu = (
    menuList: MenuConfig[],
    roles: RoleName[],
  ): MenuConfig[] => {
    let tempMenuList: MenuConfig[] = []
    menuList.forEach(item => {
      if (
        !item.roles ||
        roles.includes('admin') ||
        item.roles.some(role => roles.includes(role))
      ) {
        if (item.children && item.children.length > 0) {
          const list = filterMenu(item.children, roles)
          if (list.length > 0) {
            item.children = list
            tempMenuList = tempMenuList.concat(item)
          }
        } else {
          tempMenuList = tempMenuList.concat(item)
        }
      }
    })
    return tempMenuList
  }

  const generatorMenuItem = (item: MenuConfig) => {
    let node = null
    if (item.children && item.children.length > 0) {
      const cItem = item.children.find(c => path.indexOf(c.path) === 0)
      if (cItem) {
        defaultOpenKeys.push(item.path)
      }
      node = (
        <Menu.SubMenu
          title={item.title}
          key={item.path}
          icon={item.icon && getIcon(iconEnmu[item.icon])}
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
          icon={item.icon && getIcon(iconEnmu[item.icon])}
        >
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      )
    }
    return node
  }

  const handleMenuSelecte = (menuInfo: Partial<MenuInfo>) => {
    const {key = '/dashboard'} = menuInfo
    const menuItem = getMenuItemInMenuListByProperty(
      menuConfig,
      'path',
      key as string,
    )
    if (menuItem) {
      dispatch(
        addTagsView({
          title: menuItem.title,
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
      </Scrollbars>
    </div>
  )
}

export default memo(MenuContainer)
