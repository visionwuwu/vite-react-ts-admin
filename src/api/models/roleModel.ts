/** 角色类型 */
export type RoleName = 'admin' | 'editor' | 'guest'

/** 角色状态 */
export type RoleStatus = 0 | 1

/** 角色数据类型定义 */
export interface RoleProps {
  id: number
  roleName: string
  roleKeys: RoleName[]
  perms: string[]
  roleSort: string | number
  description?: string
  status: RoleStatus
}

/** 角色列表查询参数 */
export interface RoleQueryParams {
  roleName?: string
  status?: RoleStatus | string
}
