import {AxiosResponse} from 'axios'
import request from 'utils/request'
import {MenuProps, MenuQueryParams} from './models/menuModel'

// 菜单请求的url
enum MenuUrls {
  menuListUrl = '/system/menu/list',
  addMenuUrl = '/system/menu/add',
  updateMenuUrl = '/system/menu',
  removeMenuUrl = '/system/menu',
  getRoutesUrl = '/system/menu/getRoutes',
  menuTreeUrl = '/system/menu/tree',
  menuTreeSelectUrl = '/system/menu/treeSelect',
  roleMenuTreeSelectUrl = '/system/menu/roleMenuTreeSelect',
}

/** 请求菜单列表 */
export function getMenuList<T = any>(
  params: MenuQueryParams,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.menuListUrl,
    method: 'get',
    params,
  })
}

export function addMenu<T>(menu: MenuProps): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.addMenuUrl,
    method: 'post',
    data: menu,
  })
}

export function updateMenu<T>(
  id: string | number,
  menu: MenuProps,
): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${MenuUrls.updateMenuUrl}/${id}`,
    method: 'put',
    data: menu,
  })
}

export function removeMenu<T>(id: string | number): Promise<AxiosResponse<T>> {
  return request<T>({
    url: `${MenuUrls.removeMenuUrl}/${id}`,
    method: 'delete',
  })
}

export function findRoutes<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.getRoutesUrl,
    method: 'get',
  })
}

export function getMenuTree<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.menuTreeUrl,
    method: 'get',
  })
}

export function getTreeSelect<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.menuTreeSelectUrl,
    method: 'get',
  })
}

export function getRoleMenuTreeSelect<T>(): Promise<AxiosResponse<T>> {
  return request<T>({
    url: MenuUrls.roleMenuTreeSelectUrl,
    method: 'get',
  })
}
