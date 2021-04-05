import {MockMethod} from 'vite-plugin-mock'
import {RoleName} from './role'
import {HttpStatusCode, checkPermission, ResponseData} from './index'

/** mock api urls */
enum UserUrls {
  userInfoUrl = '/user/userinfo',
  userListUrl = '/user/list',
  addUserUrl = '/user/add',
  updateUserUrl = '/user/update',
  removeUserUrl = '/user/del',
}

/** token值类型 */
export type TokenName = 'admin-token' | 'editor-token' | 'guest-token'

/** token类型enum */
// eslint-disable-next-line
enum TokenNameEnum {
  adminToken = 'admin-token',
  editorToken = 'editor-token',
  guestToken = 'guest-token',
}

/** 用户类型 */
export enum UserType {
  /** 普通用户 */
  common = 0,
  /** 超级管理员 */
  admin = 1,
}

/** 用户状态枚举 */
export enum UserStatus {
  // 禁用
  disable = 0,
  // 启用
  enable = 1,
}

/** token类型 */
export type TokensProps = {
  [key in RoleName]?: {token: TokenName}
}

/** 用户列表类型定义 */
export type UsersProps = {
  [key in TokenName]?: UserProps
}

/** 用户类型接口定义 */
export interface UserProps {
  id: number
  username: string
  password?: string
  nickname?: string
  avatar?: string
  mobile?: string
  email?: string
  department?: string
  roles: Array<RoleName>
  type: UserType
  status?: UserStatus
  description?: string
}

/** mock token data */
export const tokens: TokensProps = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
  guest: {
    token: 'guest-token',
  },
}

/** mock user data */
export const users: UsersProps = {
  'admin-token': {
    id: 1,
    username: 'admin',
    password: 'admin',
    nickname: 'admin-nickname',
    mobile: '13767679894',
    email: '2021664244@qq.com',
    department: '研发部门',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    type: UserType.admin,
    roles: ['admin'],
    status: UserStatus.enable,
    description: '超级管理员',
  },
  'editor-token': {
    id: 2,
    username: 'editor',
    password: 'editor',
    nickname: 'editor-nickname',
    mobile: '13767679894',
    email: '2021664244@qq.com',
    department: '市场部门',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    type: UserType.common,
    roles: ['editor'],
    status: UserStatus.enable,
    description: '系统editor人员',
  },
  'guest-token': {
    id: 3,
    username: 'guest',
    password: 'guest',
    nickname: 'guest-nickname',
    mobile: '13767679894',
    email: '2021664244@qq.com',
    department: '测试部门',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: ['guest'],
    type: UserType.common,
    status: UserStatus.enable,
    description: '游客',
  },
}

export default [
  // mock useinfo
  {
    url: UserUrls.userInfoUrl,
    method: 'post',
    response: ({body}) => {
      const token = body.token
      const user = users[token as TokenName]
      if (!user) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        data: user,
      } as ResponseData
    },
  },
  // mock user list
  {
    url: UserUrls.userListUrl,
    method: 'post',
    response: ({body}) => {
      const token = body.token
      const user = users[token as TokenName]
      if (!user) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
        } as ResponseData
      }

      const tokenNames = Object.keys(users) as TokenName[]

      return {
        code: HttpStatusCode.OK,
        data: tokenNames.map(key => users[key]),
      } as ResponseData
    },
  },
  // mock add user
  {
    url: UserUrls.addUserUrl,
    method: 'post',
    response: ({body}) => {
      const {token, user} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '添加用户成功',
        data: user,
      } as ResponseData
    },
  },
  // mock update user
  {
    url: UserUrls.updateUserUrl,
    method: 'post',
    response: ({body}) => {
      const {token, user} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '更新用户成功',
        data: user,
      } as ResponseData
    },
  },
  // mock remove user
  {
    url: UserUrls.removeUserUrl,
    method: 'post',
    response: ({body}) => {
      const {token, id} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取用户信息失败',
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
