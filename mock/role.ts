import {MockMethod} from 'vite-plugin-mock'
import {checkPermission, HttpStatusCode, ResponseData} from './index'

/** 角色权限字段 */
export type RoleName = 'admin' | 'editor' | 'guest'

/** 角色状态 */
export enum RoleStatus {
  /** 禁用 */
  disable = 0,
  /** 启用 */
  enable = 1,
}

/** 角色类型enum */
// eslint-disable-next-line
enum RoleNameEnum {
  admin = 'admin',
  editor = 'editor',
  guest = 'guest',
}

/** 角色数据类型定义 */
interface Role {
  id: number
  roleName: string
  roleKeys: RoleName[]
  menuIds: string[]
  orderId: string | number
  remark?: string
  status: RoleStatus
}

/** 角色 api urls */
export enum RoleUrls {
  roleListUrl = '/role/list',
  addRoleUrl = '/role/add',
  updateRoleUrl = '/role/update',
  removeRoleUrl = '/role/remove',
}

/** mock role list data */
const roles: Role[] = [
  {
    id: 1,
    roleName: '超级管理员',
    orderId: 0,
    roleKeys: ['admin'],
    menuIds: [],
    remark: '超级管理员',
    status: RoleStatus.enable,
  },
  {
    id: 2,
    roleName: '普通用户',
    orderId: 1,
    roleKeys: ['editor'],
    menuIds: [],
    remark: '普通用户',
    status: RoleStatus.enable,
  },
  {
    id: 3,
    roleName: '游客',
    orderId: 2,
    roleKeys: ['guest'],
    menuIds: [],
    remark: '游客',
    status: RoleStatus.enable,
  },
]

export default [
  // mock role list
  {
    url: RoleUrls.roleListUrl,
    method: 'post',
    response: ({body}) => {
      const {token} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
        } as ResponseData
      }
      return {
        code: HttpStatusCode.OK,
        message: 'success',
        data: roles,
      } as ResponseData
    },
  },
  // mock add user
  {
    url: RoleUrls.addRoleUrl,
    method: 'post',
    response: ({body}) => {
      const {token, role} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，添加角色失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '添加角色成功',
        data: role,
      } as ResponseData
    },
  },
  // mock update user
  {
    url: RoleUrls.updateRoleUrl,
    method: 'post',
    response: ({body}) => {
      const {token, role} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，更新角色失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '更新角色成功',
        data: role,
      } as ResponseData
    },
  },
  // mock remove user
  {
    url: RoleUrls.removeRoleUrl,
    method: 'post',
    response: ({body}) => {
      const {token, id} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，删除角色失败',
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
