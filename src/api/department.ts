import {AxiosResponse} from 'axios'
import request from 'utils/request'
import {DepartmentProps, DepartmentQueryParams} from './models/departmentModel'

/** 部门请求urls */
enum DepartmentUrls {
  departmentListUrl = '/department/list',
  addDepartmentUrl = '/department/add',
  updateDepartmentUrl = '/department/update',
  removeDepartmentUrl = '/department/del',
}

export function getDepartmentList<T>(
  queryParams: DepartmentQueryParams = {},
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.departmentListUrl,
    method: 'post',
    data: {
      ...queryParams,
    },
  })
}

export function addUser<T>(
  department: DepartmentProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.addDepartmentUrl,
    method: 'post',
    data: {
      department,
    },
  })
}

export function updateUser<T>(
  id: string | number,
  department: DepartmentProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.updateDepartmentUrl,
    method: 'post',
    data: {
      id,
      department,
    },
  })
}

export function removeUser<T>(id: string | number): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.removeDepartmentUrl,
    method: 'post',
    data: {id},
  })
}
