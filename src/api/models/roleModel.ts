/** 角色状态 */
export enum RoleStatus {
  /** 禁用 */
  disable = 0,
  /** 启用 */
  enable = 1,
}

/** 角色类型 */
export enum RoleType {
  /** 普通角色 */
  common = 0,
  /** 超级管理员角色 */
  admin = 1,
}

/** 角色数据类型定义 */
export interface RoleProps {
  _id: string
  roleName: string
  roleKeys: string
  menuIdList: string[] | Record<string, any>
  orderId: string | number
  remark?: string
  deptId?: string[]
  status: RoleStatus
  type: RoleType
}

/** 角色列表查询参数 */
export interface RoleQueryParams {
  name?: string
  status?: RoleStatus | string
  pageNumber?: number
  pageSize?: number
}
