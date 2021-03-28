import * as types from '../action-types'
import {getUserInfo} from 'apis/user'
import {Dispatch} from 'redux'
import {ResponseData} from 'mock'
import {UserStateProps} from '../reducers/user'

export interface ISetTokenAction {
  type: types.SET_TOKEN_TYPE
  payload: string
}

export interface IResetUserAction {
  type: types.RESET_USER_TYPE
}

export interface IGetUserinfoAction {
  type: types.GET_USERINFO_TYPE
}

export interface ISetUserinfoAction {
  type: types.SET_USERINFO_TYPE
  payload: UserStateProps
}

export const setUserToken = (payload: string): ISetTokenAction => {
  return {
    type: types.SET_TOKEN,
    payload,
  }
}

export const resetUser = (): IResetUserAction => {
  return {
    type: types.RESET_USER,
  }
}

export const setUserinfo = (userinfo: UserStateProps): ISetUserinfoAction => {
  return {
    type: types.SET_USERINFO,
    payload: userinfo,
  }
}

export const getUserinfo = (token: string) => (
  dispatch: Dispatch,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    getUserInfo(token)
      .then(response => {
        const data = response.data as ResponseData
        if (data.code === 20000) {
          const userinfo = data.data
          dispatch(setUserinfo(userinfo))
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

export type UserAction =
  | ISetTokenAction
  | IResetUserAction
  | IGetUserinfoAction
  | ISetUserinfoAction
