import {AxiosResponse} from 'axios'
import request from 'utils/request'

/** 用户请求urls */
enum LoginUrls {
  userLogin = '/user/login',
  userLogout = '/user/logout',
}

interface UserProps {
  username: string
  password: string
}

export function reqLogin<T>(data: UserProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: LoginUrls.userLogin,
    method: 'post',
    data,
  })
}

export function reqLogout<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: LoginUrls.userLogout,
    method: 'post',
  })
}
