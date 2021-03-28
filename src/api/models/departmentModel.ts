/** 部门类型定义 */
export interface DepartmentProps {
  parentId: string | number
  deptName: string
  deptId: string | number
  orderNum: string | number
  leader: string
  email?: string
  phone?: string
  children?: DepartmentProps[]
  status: string | boolean
  ancestors?: string
  searchValue?: string | null
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string | null
  remark?: string | null | number
  params?: Record<string, unknown> | null
  delFlag?: string
  parentName?: string | null
}

export type DepartmentStatus = 0 | 1

/** 部门列表查询参数 */
export interface DepartmentQueryParams {
  deptName?: string
  status?: DepartmentStatus | string
}
