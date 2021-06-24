import request from 'utils/request'
import {AxiosResponse} from 'axios'
import {
  UserProps,
  UserQueryParams,
  UserStatus,
  UserType,
} from './models/userModel'

/** api请求urls */
enum UserUrls {
  getUserInfo = 'user/info',
  getUserList = 'system/user/list',
  addUser = 'system/user/add',
  updateUser = 'system/user',
  removeUser = 'system/user',
  resetPwdUrl = '/system/user/resetPwd',
  changeStatusUrl = '/system/user/changeStatus',
}

export function getUserInfo<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.getUserInfo,
    method: 'get',
  })
}
// eslint-disable-next-line
export function getUserList<T = any>(
  params: UserQueryParams,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.getUserList,
    method: 'get',
    params,
  })
}

export function addUser<T>(user: UserProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.addUser,
    method: 'post',
    data: user,
  })
}

export function updateUser<T>(
  id: string,
  user: UserProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${UserUrls.updateUser}/${id}`,
    method: 'put',
    data: user,
  })
}

export function removeUser<T>(id: string): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${UserUrls.removeUser}/${id}`,
    method: 'delete',
  })
}

export function resetPwd<T>(
  id: string,
  password: string,
  type: UserType,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.resetPwdUrl,
    method: 'patch',
    data: {
      id,
      password,
      type,
    },
  })
}

export function changeUserStatus<T>(
  id: string,
  status: UserStatus,
  type: UserType,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: UserUrls.changeStatusUrl,
    method: 'patch',
    data: {
      id,
      status,
      type,
    },
  })
}
