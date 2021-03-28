import {MockMethod} from 'vite-plugin-mock'
import {checkPermission, HttpStatusCode, ResponseData} from './index'

/** mock 部门urls */
enum DepartmentUrls {
  departmentListUrl = '/department/list',
  addDepartmentUrl = '/department/add',
  updateDepartmentUrl = '/department/update',
  removeDepartmentUrl = '/department/del',
}

/** 部门类型定义 */
export interface DepartmentProps {
  parentId: string | number
  deptName: string
  deptId: string | number
  orderNum: string | number
  leader: string
  email?: string
  phone?: string
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

/** mock department list */
const departments: DepartmentProps[] = [
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 100,
    parentId: 0,
    ancestors: '0',
    deptName: '若依科技',
    orderNum: '0',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 101,
    parentId: 100,
    ancestors: '0,100',
    deptName: '深圳总公司',
    orderNum: '1',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 102,
    parentId: 100,
    ancestors: '0,100',
    deptName: '长沙分公司',
    orderNum: '2',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 103,
    parentId: 101,
    ancestors: '0,100,101',
    deptName: '研发部门',
    orderNum: '1',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 104,
    parentId: 101,
    ancestors: '0,100,101',
    deptName: '市场部门',
    orderNum: '2',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 105,
    parentId: 101,
    ancestors: '0,100,101',
    deptName: '测试部门',
    orderNum: '3',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 106,
    parentId: 101,
    ancestors: '0,100,101',
    deptName: '财务部门',
    orderNum: '4',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 107,
    parentId: 101,
    ancestors: '0,100,101',
    deptName: '运维部门',
    orderNum: '5',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 108,
    parentId: 102,
    ancestors: '0,100,102',
    deptName: '市场部门',
    orderNum: '1',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
  {
    searchValue: null,
    createBy: 'admin',
    createTime: '2020-11-20 19:29:42',
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    deptId: 109,
    parentId: 102,
    ancestors: '0,100,102',
    deptName: '财务部门',
    orderNum: '2',
    leader: '若依',
    phone: '15888888888',
    email: 'ry@qq.com',
    status: '0',
    delFlag: '0',
    parentName: null,
  },
]

export default [
  // mock department list
  {
    url: DepartmentUrls.departmentListUrl,
    method: 'post',
    response: ({body}) => {
      const token = body.token
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，获取部门数据失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: 'success',
        data: departments,
      } as ResponseData
    },
  },
  // mock add department
  {
    url: DepartmentUrls.addDepartmentUrl,
    method: 'post',
    response: ({body}) => {
      const {token, department} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，添加部门失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '添加部门成功',
        data: department,
      } as ResponseData
    },
  },
  // mock update department
  {
    url: DepartmentUrls.updateDepartmentUrl,
    method: 'post',
    response: ({body}) => {
      const {token, department} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，更新部门信息失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '更新部门成功',
        data: department,
      } as ResponseData
    },
  },
  // mock remove department
  {
    url: DepartmentUrls.removeDepartmentUrl,
    method: 'post',
    response: ({body}) => {
      const {token, id} = body
      if (!checkPermission(token)) {
        return {
          code: HttpStatusCode.ILLEGAL_UNAUTHORIZED,
          message: '非法token，删除部门信息失败',
        } as ResponseData
      }

      return {
        code: HttpStatusCode.OK,
        message: '删除成功',
        data: id,
      } as ResponseData
    },
  },
] as MockMethod[]
