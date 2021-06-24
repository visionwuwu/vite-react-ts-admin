/** 性别枚举 */
export enum SexEnum {
  // 男
  male = 1,
  // 女
  female = 2,
  // 未知
  unknown = 3,
}

/** 用户状态枚举 */
export enum UserStatus {
  // 禁用
  disable = 0,
  // 启用
  enable = 1,
}

/** 用户类型 */
export enum UserType {
  /** 普通用户 */
  common = 0,
  /** 超级管理员 */
  admin = 1,
}

/** 用户类型 */
export interface UserProps {
  _id: string
  username: string
  password?: string
  nickname?: string
  roles: string[]
  avatar?: string
  mobile?: string
  email?: string
  sex?: SexEnum
  type?: UserType
  remark?: string
  status?: UserStatus
}

export interface UserQueryParams {
  /** 用户名 */
  username?: string
  /** 昵称 */
  nickname?: string
  /** 部门id */
  deptId?: number | string
  /** 当前页 */
  pageNumber?: number
  /** 分页数目 */
  pageSize?: number
}
