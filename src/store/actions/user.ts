import * as types from '../action-types'
import {getUserInfo} from 'apis/user'
import {findRoutes} from 'apis/menu'
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

export interface ISetRoutesAction {
  type: types.SET_ROUTES_TYPE
  payload: any[]
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

export const setRoutes = (routes: any[]): ISetRoutesAction => {
  return {
    type: types.SET_ROUTES,
    payload: routes,
  }
}

export const getUserinfo = () => (dispatch: Dispatch): Promise<any> => {
  return new Promise((resolve, reject) => {
    getUserInfo()
      .then(response => {
        const data = response.data as ResponseData
        if (data.code === 20000) {
          setTimeout(() => {
            const userinfo = data.data
            const {
              _id,
              roleIdList,
              roles,
              type,
              createdAt,
              updatedAt,
              __v,
              ...restProps
            } = userinfo
            dispatch(setUserinfo(restProps))
            resolve(data)
          }, 300)
        } else {
          reject(data.message)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getRoutes = () => (dispatch: Dispatch): Promise<any> => {
  return new Promise((resolve, reject) => {
    findRoutes()
      .then(response => {
        const data = response.data as ResponseData
        if (data.code === 20000) {
          const routes = data.data
          dispatch(setRoutes(routes))
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
  | ISetRoutesAction
