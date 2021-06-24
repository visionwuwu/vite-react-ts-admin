/** 菜单类型 */
export enum MenuType {
  /** 目录 */
  M = 2,
  /** 菜单 */
  C = 1,
  /** 按钮 */
  B = 0,
}

/** 菜单状态 */
export enum MenuStatus {
  /** 禁用 */
  disable = 0,
  /** 启用 */
  enable = 1,
}

/** 菜单项数据类型定义 */
export interface MenuProps {
  _id: string
  name: string
  icon?: string
  path?: string
  orderId: string | number
  parentId: string
  type: MenuType
  status: MenuStatus
}

/** 菜单列表查询参数 */
export interface MenuQueryParams {
  name?: string
  status?: MenuStatus | string
}
