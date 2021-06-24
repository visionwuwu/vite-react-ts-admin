import {MockMethod} from 'vite-plugin-mock'
import {checkPermission, HttpStatusCode, ResponseData} from './index'

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
  parentId: number
  type: MenuType
  status: MenuStatus
}

/** mock menu list data */
// eslint-disable-next-line
const menuList: MenuItem[] = [
  {
    id: 1,
    name: '首页',
    icon: 'HomeOutlined',
    path: '/dashboard',
    orderId: 0,
    parentId: 0,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 2,
    name: '开发文档',
    icon: 'FileOutlined',
    path: '/doc',
    orderId: 1,
    parentId: 0,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 3,
    name: '权限测试',
    icon: 'LockOutlined',
    path: '/permission',
    orderId: 2,
    parentId: 0,
    type: MenuType.M,
    status: MenuStatus.enable,
  },
  {
    id: 4,
    name: '权限说明',
    path: '/permission/explanation',
    orderId: 0,
    parentId: 3,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 5,
    name: 'admin页面',
    path: '/permission/admin',
    orderId: 1,
    parentId: 3,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 6,
    name: 'editor页面',
    path: '/permission/editor',
    orderId: 2,
    parentId: 3,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 7,
    name: 'guest页面',
    path: '/permission/guest',
    orderId: 3,
    parentId: 3,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 8,
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/system',
    orderId: 3,
    parentId: 0,
    type: MenuType.M,
    status: MenuStatus.enable,
  },
  {
    id: 9,
    name: '账号管理',
    path: '/system/account',
    orderId: 0,
    parentId: 8,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 10,
    name: '角色管理',
    path: '/system/role',
    orderId: 1,
    parentId: 8,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 11,
    name: '菜单管理',
    path: '/system/menu',
    orderId: 2,
    parentId: 8,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 12,
    name: '部门管理',
    path: '/system/dept',
    orderId: 3,
    parentId: 8,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 13,
    name: '修改密码',
    path: '/system/changePassword',
    orderId: 4,
    parentId: 8,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 14,
    name: '嵌套路由',
    icon: 'ClusterOutlined',
    path: '/nested',
    orderId: 4,
    parentId: 0,
    type: MenuType.M,
    status: MenuStatus.enable,
  },
  {
    id: 15,
    name: '菜单1',
    path: '/nested/menu1',
    orderId: 0,
    parentId: 14,
    type: MenuType.M,
    status: MenuStatus.enable,
  },
  {
    id: 16,
    name: '菜单1-1',
    path: '/nested/menu1/menu1-1',
    orderId: 0,
    parentId: 15,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 17,
    name: '菜单1-2',
    path: '/nested/menu1/menu1-2',
    orderId: 1,
    parentId: 15,
    type: MenuType.M,
    status: MenuStatus.enable,
  },
  {
    id: 18,
    name: '菜单1-2-1',
    path: '/nested/menu1/menu1-2/menu1-2-1',
    orderId: 0,
    parentId: 17,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
  {
    id: 19,
    name: '关于作者',
    path: '/about',
    orderId: 5,
    parentId: 0,
    type: MenuType.C,
    status: MenuStatus.enable,
  },
]

export default [
  // mock menu list
  {
    url: MenuUrls.menuListUrl,
    method: 'post',
    response: ({body}) => {
      const {token} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取菜单失效',
        } as ResponseData
      }
      return {
        code: HttpStatusCode.OK,
        message: 'success',
        data: menuList,
      } as ResponseData
    },
  },
  // mock add menu
  {
    url: MenuUrls.addMenuUrl,
    method: 'post',
    response: ({body}) => {
      const {token, menu} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，添加菜单失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '添加菜单成功',
        data: menu,
      } as ResponseData
    },
  },
  // mock update menu
  {
    url: MenuUrls.updateMenuUrl,
    method: 'post',
    response: ({body}) => {
      const {token, menu} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，更新菜单失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '更新菜单成功',
        data: menu,
      } as ResponseData
    },
  },
  // mock remove menu
  {
    url: MenuUrls.removeMenuUrl,
    method: 'post',
    response: ({body}) => {
      const {token, id} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，删除菜单失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '删除成功',
        data: id,
      } as ResponseData
    },
  },
] as MockMethod[]
