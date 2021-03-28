import * as types from '../action-types'
import {Dispatch} from 'redux'
import {resetUser, setUserToken} from './user'
import {reqLogin, reqLogout} from 'apis/login'
import {ResponseData} from 'mock/index'
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
    reqLogin({username, password})
      .then(response => {
        const data = response.data as ResponseData
        if (data.code === 20000) {
          const token = data.data
          dispatch(setUserToken(token))
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
