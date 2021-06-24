import * as types from '../action-types'
import {Dispatch} from 'redux'
import {resetUser, setUserinfo, setUserToken} from './user'
import {reqLogin, reqLogout} from 'apis/login'
import {HttpStatusCode, ResponseData} from 'mock/index'
import {setToken, removeToken} from 'utils/auth'

export interface LoginAction {
  type: types.AUTH_LOGIN_TYPE
}

export interface LogoutAction {
  type: types.AUTH_LOGOUT_TYPE
}

export type AsyncLoginAction = ReturnType<typeof login>

export type AsyncLogoutAction = ReturnType<typeof logout>

export const login = (username: string, password: string) => (
  dispatch: Dispatch,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    reqLogin<any>({username, password})
      .then(response => {
        const data = response.data
        if (data.code === HttpStatusCode.OK) {
          const {token, userInfo} = data.data
          const {
            _id,
            roleIdList,
            roles,
            type,
            createdAt,
            updatedAt,
            __v,
            ...restProps
          } = userInfo
          dispatch(setUserToken(token))
          dispatch(setUserinfo(restProps))
          setToken(token)
          resolve(data)
        } else {
          reject(data.message)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const logout = () => (dispatch: Dispatch): Promise<any> => {
  return new Promise((resolve, reject) => {
    reqLogout()
      .then(response => {
        const data = response.data as ResponseData
        if (data.code === 20000) {
          dispatch(resetUser())
          removeToken()
          resolve(data)
        } else {
          reject(data.message)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export type AuthAction = LoginAction | LogoutAction
