import {MockMethod} from 'vite-plugin-mock'
import {users, tokens, UserProps} from './user'
import {ResponseData, HttpStatusCode} from './index'

/** mock login api urls */
enum LoginUrls {
  userLogin = '/user/login',
  userLogout = '/user/logout',
}

export default [
  // user login
  {
    url: LoginUrls.userLogin,
    method: 'post',
    response: ({body}) => {
      const {username, password} = body
      const userToken = tokens[username]
      if (!userToken) {
        return {
          code: HttpStatusCode.USERNAME_ERROR,
          message: '用户名不正确',
        } as ResponseData
      }

      const token = userToken.token

      const user = users[token] as UserProps

      if (user.password !== password) {
        return {
          code: HttpStatusCode.PASSWORD_ERROR,
          message: '密码错误',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: 'success',
        data: token,
      } as ResponseData
    },
  },
  // user logout
  {
    url: LoginUrls.userLogout,
    method: 'post',
    response: () => {
      return {
        code: HttpStatusCode.OK,
        message: 'success',
      } as ResponseData
    },
  },
] as MockMethod[]
