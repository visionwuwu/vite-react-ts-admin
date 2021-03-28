import request from 'utils/request'
import {AxiosResponse} from 'axios'
import {RoleProps, RoleQueryParams} from './models/roleModel'

/** api请求urls */
enum RoleUrls {
  roleListUrl = '/role/list',
  addRoleUrl = '/role/add',
  updateRoleUrl = '/role/update',
  removeRoleUrl = '/role/remove',
}

export function getRoleList<T = any>(
  queryParams: RoleQueryParams,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.roleListUrl,
    method: 'post',
    data: {
      ...queryParams,
    },
  })
}

export function addRole<T>(role: RoleProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.addRoleUrl,
    method: 'post',
    data: {
      role,
    },
  })
}

export function updateRole<T>(
  id: string | number,
  role: RoleProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.updateRoleUrl,
    method: 'post',
    data: {
      id,
      role,
    },
  })
}

export function removeRole<T>(id: string | number): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.removeRoleUrl,
    method: 'post',
    data: {id},
  })
}
