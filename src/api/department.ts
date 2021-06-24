import {AxiosResponse} from 'axios'
import request from 'utils/request'
import {DepartmentProps, DepartmentQueryParams} from './models/departmentModel'

/** 部门请求urls */
enum DepartmentUrls {
  departmentListUrl = 'system/dept/list',
  addDepartmentUrl = 'system/dept/add',
  updateDepartmentUrl = 'system/dept',
  removeDepartmentUrl = 'system/dept',
  selectDepartmentUrl = 'system/dept/select',
  ownDeptTreeUrl = 'system/dept/ownDeptTree',
  roleDeptTreeSelectUrl = 'system/dept/roleDeptTree',
}

export function getDepartmentList<T>(
  params: DepartmentQueryParams = {},
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.departmentListUrl,
    method: 'get',
    params,
  })
}

export function addDepartment<T>(
  department: DepartmentProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.addDepartmentUrl,
    method: 'post',
    data: department,
  })
}

export function updateDepartment<T>(
  id: string,
  department: DepartmentProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${DepartmentUrls.updateDepartmentUrl}/${id}`,
    method: 'put',
    data: department,
  })
}

export function removeDepartment<T>(
  id: string | number,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${DepartmentUrls.removeDepartmentUrl}/${id}`,
    method: 'delete',
  })
}

export function selectDepartment<T>(id: string): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${DepartmentUrls.selectDepartmentUrl}/${id}`,
    method: 'get',
  })
}

export function roleDeptTreeSelect<T>(id: string): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${DepartmentUrls.roleDeptTreeSelectUrl}/${id}`,
    method: 'get',
  })
}

export function ownDeptTree<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: DepartmentUrls.ownDeptTreeUrl,
    method: 'get',
  })
}
