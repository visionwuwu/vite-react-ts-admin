/** 部门类型定义 */
export interface DepartmentProps {
  _id: string
  parentId: string
  name: string
  orderId: number
  leader: string
  email?: string
  mobile?: string
  status?: DepartmentStatus
}

/** 部门状态 */
export enum DepartmentStatus {
  /** 启用 */
  enable = 1,
  /** 禁用 */
  disable = 0,
}

/** 部门列表查询参数 */
export interface DepartmentQueryParams {
  name?: string
  status?: DepartmentStatus | string
}
