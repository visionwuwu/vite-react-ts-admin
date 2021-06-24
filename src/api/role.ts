import request from 'utils/request'
import {AxiosResponse} from 'axios'
import {RoleProps, RoleQueryParams, RoleType} from './models/roleModel'
import {RoleStatus} from 'root/mock/role'

/** api请求urls */
enum RoleUrls {
  roleListUrl = 'system/role/list',
  addRoleUrl = 'system/role/add',
  updateRoleUrl = 'system/role',
  removeRoleUrl = 'system/role',
  selectRoleUrl = 'system/role/all',
  changeStatusUrl = 'system/role/changeStatus',
  dataScopeUrl = 'system/role/dataScope',
}

export function getRoleList<T = any>(
  params: RoleQueryParams,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.roleListUrl,
    method: 'get',
    params,
  })
}

export function addRole<T>(role: RoleProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.addRoleUrl,
    method: 'post',
    data: role,
  })
}

export function updateRole<T>(
  id: string,
  role: RoleProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${RoleUrls.updateRoleUrl}/${id}`,
    method: 'put',
    data: role,
  })
}

export function removeRole<T>(id: string): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${RoleUrls.removeRoleUrl}/${id}`,
    method: 'delete',
  })
}

export function selectRole<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.selectRoleUrl,
    method: 'get',
  })
}

export function changeRoleStatus<T>(
  id: string,
  status: RoleStatus,
  type: RoleType,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.changeStatusUrl,
    method: 'patch',
    data: {
      id,
      status,
      type,
    },
  })
}

export function dataScope<T>(
  id: string,
  deptIds: string[],
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: RoleUrls.dataScopeUrl,
    method: 'patch',
    data: {
      id,
      deptIds,
    },
  })
}
