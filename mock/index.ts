import {MockMethod} from 'vite-plugin-mock'
import {users, TokenName} from './user'
/** 自定义http响应状态码 */
export enum HttpStatusCode {
  OK = 20000,
  USERNAME_ERROR = 60204,
  PASSWORD_ERROR = 60203,
  BAD_REQUEST = 40000,
  ILLEGAL_UNAUTHORIZED = 50008,
}

/** httpResponse响应数据格式 */
export interface ResponseData {
  code: number
  message?: string
  data: any
}

/** 校验是否有权限 */
export function checkPermission(token: TokenName): boolean {
  const user = users[token]
  if (!user) {
    return false
  }
  return true
}

export default [] as MockMethod[]
