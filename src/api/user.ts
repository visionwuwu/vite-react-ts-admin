import request from 'utils/request'
import {AxiosResponse} from 'axios'
import {UserProps, UserQueryParams} from './models/userModel'

/** api请求urls */
enum UserUrls {
  getUserInfo = '/user/userinfo',
  getUserList = '/user/list',
  addUser = '/user/add',
  updateUser = '/user/update',
  removeUser = '/user/remove',
}

export function getUserInfo<T>(token: string): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.getUserInfo,
    method: 'post',
    data: {token},
  })
}
// eslint-disable-next-line
export function getUserList<T = any>(
  queryParams: UserQueryParams,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.getUserList,
    method: 'post',
    data: {
      ...queryParams,
    },
  })
}

export function addUser<T>(user: UserProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.addUser,
    method: 'post',
    data: {
      user,
    },
  })
}

export function updateUser<T>(
  id: string | number,
  user: UserProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.updateUser,
    method: 'post',
    data: {
      id,
      user,
    },
  })
}

export function removeUser<T>(id: string | number): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.removeUser,
    method: 'post',
    data: {id},
  })
}
