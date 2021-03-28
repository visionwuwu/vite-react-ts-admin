import {MockMethod} from 'vite-plugin-mock'

/** mock menu api urls */
export enum MenuUrls {
  menuListUrl = '/menu/list',
  addMenuUrl = '/menu/add',
  updateMenuUrl = '/menu/update',
  removeMenuUrl = '/menu/del',
  getRoutesUrl = '/menu/routes',
}

/** 菜单类型 */
export enum MenuType {
  /** 目录 */
  M = 2,
  /** 菜单 */
  C = 1,
  /** 按钮 */
  B = 0,
}

/** 菜单状态 */
export enum MenuStatus {
  /** 禁用 */
  disable = 0,
  /** 启用 */
  enable = 1,
}

/** 菜单项数据类型定义 */
export interface MenuItem {
  id: number
  name: string
  icon?: string
  path: string
  orderId: string | number
  pid: number
  type: MenuType
  status: MenuStatus
}

/** mock menu list data */
// eslint-disable-next-line
const menuList: MenuItem[] = []

export default [
  // mock menu list
  {
    url: MenuUrls.menuListUrl,
    method: 'post',
    response: ({body}) => {
      return body
    },
  },
] as MockMethod[]
