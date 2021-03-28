import {RoleName} from './roleModel'

/** 用户类型 */
export interface UserProps {
  id: number
  username: string
  password?: string
  nickname?: string
  avatar?: string
  mobile?: string
  email?: string
  roles: Array<RoleName>
  description?: string
  status?: boolean
}

export interface UserQueryParams {
  /** 用户名 */
  username?: string
  /** 昵称 */
  nickname?: string
  /** 部门id */
  key?: number | string
}
