import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ColumnsType} from 'antd/lib/table/interface'
import VBasictable from 'comps/VBasicTable'
import VBasicModalForm, {ModalFormImperativeProps} from 'comps/VBasicModalForm'
import VBasicDrawerForm, {DrawerFormImperative} from 'comps/VBasicDrawerForm'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import {Button, Popconfirm, Divider, message, Tag} from 'antd'
import {DeleteOutlined, FormOutlined} from '@ant-design/icons'
import {
  addRole,
  changeRoleStatus,
  dataScope,
  getRoleList,
  removeRole,
  updateRole,
} from 'apis/role'
import {RoleProps, RoleQueryParams, RoleType} from 'apis/models/roleModel'
import {ResponseData} from 'apis/index'
import {HttpStatusCode} from 'mock/index'
import {RoleStatus} from 'root/mock/role'
import {getMenuTree} from 'root/src/api/menu'
import {treeDataTranslate} from 'root/src/utils'
import {isPlainObject, timestampToTime} from 'root/src/utils/utils'
import {roleDeptTreeSelect, selectDepartment} from 'root/src/api/department'
import './index.less'

interface IRoleProps {}

/** 表格分页参数 */
interface TablePagination {
  pageNumber?: number
  pageSize?: number
  total?: number
}

/** 查询角色列表筛选参数 */
interface FilterParams {
  name: string
  status: RoleStatus | string
}

/** 初始分页数据 */
const initPagination = {
  pageNumber: 1,
  pageSize: 10,
  total: 0,
}

/** 初始筛选数据 */
const initFilterParams = {
  name: '',
  status: '',
}

const othersHeight = 218

const Role: React.FC<IRoleProps> = () => {
  /** 角色列表 */
  const [roleList, setRoleList] = useState([])
  /** 是否刷新表格标识 */
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  /** 表格loading加载状态 */
  const [tableLoading, setTableLoading] = useState(false)
  /** 菜单权限树 */
  const [menuTree, setMenuTree] = useState<any[]>([])
  /** 部门数据树 */
  const [deptTree, setDeptTree] = useState<any[]>([])
  /** 抽屉表单ref引用 */
  const drawerFormRef = useRef<DrawerFormImperative>()
  /** 弹框表单ref引用 */
  const modalFormRef = useRef<ModalFormImperativeProps>()
  /** 用户列表筛选查询参数 */
  const [filterParams, setFilterParams] = useState<FilterParams>(
    initFilterParams,
  )
  /** 分页参数 */
  const [pagination, setPagination] = useState<TablePagination>(initPagination)

  /** 角色表格列 */
  const columns: ColumnsType<any> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
      align: 'center',
      key: 'roleKey',
    },
    {
      title: '显示顺序',
      dataIndex: 'orderId',
      align: 'center',
      key: 'orderId',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   align: 'center',
    //   key: 'status',
    //   // eslint-disable-next-line
    //   render: status => {
    //     const text = status === 1 ? '启用' : '停用'
    //     const color = status === 1 ? 'green' : 'red'
    //     return <Tag color={color}>{text}</Tag>
    //   },
    // },
    {
      key: 111,
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      // eslint-disable-next-line
      render: (status: any, record: any) => {
        const hasChecked = status === RoleStatus.enable
        const color = hasChecked ? '#85CE61' : '#F56C6C'
        const title = `确认要"${hasChecked ? '停用' : '启用'}""${
          record.name
        }"角色吗?`
        return (
          <>
            <Popconfirm
              onConfirm={handleChangeStatus.bind(null, record)}
              title={title}
              okText="确认"
              cancelText="取消"
            >
              <Tag color={color} style={{cursor: 'pointer'}}>
                {!hasChecked ? '停用' : '启用'}
              </Tag>
            </Popconfirm>
          </>
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      key: 'createdAt',
      render: text => {
        return text ? timestampToTime(text) : '——'
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      align: 'center',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      // eslint-disable-next-line
      render: (text, record) => {
        return (
          <>
            <Button
              onClick={handleUpdateItem.bind(null, record as any)}
              type="link"
              size="small"
              icon={<FormOutlined />}
            />
            <Divider type="vertical" dashed />
            <Popconfirm
              onConfirm={handleRemoveItem.bind(null, record)}
              title="是否确认删除?"
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="link"
                danger
                size="small"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
            <Divider type="vertical" dashed />
            <Button
              onClick={handleAuthData.bind(null, record)}
              size="small"
              type="text"
              style={{color: '#85CE61'}}
            >
              数据授权
            </Button>
          </>
        )
      },
    },
  ]

  /** 筛选表单项 */
  const formItems = useMemo<IFormItemProps[]>(
    () => [
      {
        type: 'input',
        label: '角色名称',
        name: 'name',
        value: '',
      },
      {
        type: 'select',
        label: '状态',
        name: 'status',
        value: '',
        othersProps: {
          options: [
            {
              label: '启用',
              value: RoleStatus.enable,
            },
            {
              label: '禁用',
              value: RoleStatus.disable,
            },
          ],
        },
      },
    ],
    [],
  )

  /** 弹框表单项（部门数据授权） */
  const authDataFormItem: IFormItemProps[] = [
    {
      type: 'tree',
      name: 'deptIds',
      value: [],
      othersProps: {
        title: '数据授权',
        showIcon: false,
        treeData: deptTree,
        showSearch: true,
        checkStrictly: false,
      },
    },
  ]

  /** 抽屉表单项 */
  const formFields: IFormItemProps[] = [
    {
      type: 'input',
      label: '角色名',
      name: 'name',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入角色名',
        },
      ],
    },
    {
      type: 'input',
      label: '权限字符',
      name: 'roleKey',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入权限字符',
        },
      ],
    },
    {
      type: 'number',
      label: '角色顺序',
      name: 'orderId',
      value: '',
      rules: [
        {
          required: true,
          message: '角色顺序不能为空',
        },
      ],
      othersProps: {
        style: {
          width: '35%',
        },
        min: 0,
      },
    },
    {
      type: 'radio-group',
      label: '角色状态',
      name: 'status',
      value: RoleStatus.enable,
      othersProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '启用',
            value: RoleStatus.enable,
          },
          {
            label: '禁用',
            value: RoleStatus.disable,
          },
        ],
      },
    },
    {
      type: 'textarea',
      label: '描述',
      name: 'remark',
      value: '',
    },
    {
      type: 'hidden',
      name: 'type',
      value: RoleType.common,
    },
    {
      type: 'tree',
      label: '拥有菜单',
      name: 'menuIdList',
      value: [],
      othersProps: {
        title: '菜单权限',
        showIcon: false,
        treeData: menuTree,
      },
    },
  ]

  /** 获取用户列表 */
  useEffect(() => {
    setTableLoading(true)
    delete pagination.total
    getRoleList<ResponseData>({...filterParams, ...pagination})
      .then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          setRoleList(res.data)
          setPagination(p => ({...p, total: res.total}))
        }
      })
      .finally(() => {
        setTableLoading(false)
      })
  }, [toggleRefreshTable])

  /** 获取菜单权限树 */
  useEffect(() => {
    getMenuTree<ResponseData>().then(response => {
      const data = response.data
      if (data.code === HttpStatusCode.OK) {
        const menuTree = treeDataTranslate(data.data, '_id', 'parentId', {
          key: '_id',
          title: 'name',
        })
        setMenuTree(menuTree)
      }
    })
  }, [])

  // 重置查询条件
  const handleReset = () => {
    setFilterParams(initFilterParams)
    setPagination(initPagination)
    setToggleRefreshTable(f => !f)
  }

  // 处理刷新表格
  const handleRefresh = () => {
    setToggleRefreshTable(f => !f)
  }

  // 处理条件查询
  const handleFinish = (values: FilterParams) => {
    setFilterParams(values)
    setPagination(initPagination)
    setToggleRefreshTable(f => !f)
  }

  // 点击新增列表项
  const handleAddBtnClick = () => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    openFormDrawer((values: RoleProps) => {
      /** 选择的菜单可能为对象或数组，所以需要格式化为数组 */
      if (!Array.isArray(values.menuIdList)) {
        values.menuIdList = values.menuIdList.checked
      }
      console.log(values)
      // return
      addRole<ResponseData>(values)
        .then(response => {
          const res = response.data
          if (res.code === HttpStatusCode.OK) {
            message.success(res.message || 'success')
            setToggleRefreshTable(f => !f)
          }
        })
        .finally(() => {
          closeFormDrawer()
        })
    })
  }

  // 更新列表项
  const handleUpdateItem = (item: RoleProps) => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    openFormDrawer(
      (values: RoleProps) => {
        /** 选择的菜单可能为对象或数组，所以需要格式化为数组 */
        if (!Array.isArray(values.menuIdList)) {
          values.menuIdList = values.menuIdList.checked
        }
        console.log(values)
        updateRole<ResponseData>(item._id, values)
          .then(response => {
            const res = response.data
            if (res.code === HttpStatusCode.OK) {
              message.success(res.message || 'success')
              setToggleRefreshTable(f => !f)
            }
          })
          .finally(() => {
            closeFormDrawer()
          })
      },
      {
        ...item,
      },
    )
  }

  // 改变角色状态
  const handleChangeStatus = (...args: any) => {
    const record = args[0]
    console.log(record)
    const status =
      record.status === RoleStatus.enable
        ? RoleStatus.disable
        : RoleStatus.enable
    changeRoleStatus<ResponseData>(record._id, status, record.type).then(
      response => {
        const data = response.data
        if (data.code === HttpStatusCode.OK) {
          message.success(data.message || '更新成功')
          setToggleRefreshTable(f => !f)
        }
      },
    )
  }

  // 处理删除列表项
  const handleRemoveItem = (item: RoleProps) => {
    removeRole<ResponseData>(item._id).then(response => {
      const res = response.data
      if (res.code === HttpStatusCode.OK) {
        message.success(res.message || 'success')
        setToggleRefreshTable(f => !f)
      }
    })
  }

  // 处理数据授权
  const handleAuthData = async (item: RoleProps) => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    const res = await roleDeptTreeSelect<ResponseData>(item._id)
    if (res.data.code === HttpStatusCode.OK) {
      const list = treeDataTranslate(res.data.data || [], '_id', 'parentId', {
        key: '_id',
        title: 'name',
      })
      setDeptTree(list)
    }
    openModalForm(
      (values: any) => {
        const {deptIds} = values
        dataScope<ResponseData>(item._id, deptIds || [])
          .then(response => {
            const res = response.data
            if (res.code === HttpStatusCode.OK) {
              setToggleRefreshTable(f => !f)
              message.success(res.message || '更新成功')
            } else {
              message.error('更新失败')
            }
          })
          .finally(() => {
            closeModalForm()
          })
      },
      {deptIds: item.deptId || []},
    )
    console.log(item)
  }

  // 页码改变
  const handlePageChange = (page: number) => {
    if (pagination.pageNumber !== page) {
      setPagination(p => ({...p, pageNumber: page}))
      setToggleRefreshTable(f => !f)
    }
  }

  // 分页数量改变
  const handleSizeChange = (current: number, size: number) => {
    setPagination(p => ({...p, pageSize: size}))
    setToggleRefreshTable(f => !f)
  }

  return (
    <div className="app-container">
      <VBasictable
        dataSource={roleList}
        columns={columns}
        title="角色列表"
        addBtnText="新增角色"
        formItems={formItems}
        rowKey="id"
        onRefresh={handleRefresh}
        onReset={handleReset}
        onFinish={handleFinish}
        addBtnClick={handleAddBtnClick}
        othersNodeHeight={othersHeight}
        loading={tableLoading}
        pagination={{
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange,
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
      />

      {/* 抽屉表单弹框 */}
      <VBasicDrawerForm
        width={500}
        ref={drawerFormRef}
        title="角色"
        formItems={formFields}
        singleLineDisplay={true}
      />

      {/* 数据授权弹框 */}
      <VBasicModalForm
        formItems={authDataFormItem}
        ref={modalFormRef}
        width={650}
        title="权限分配"
      />
    </div>
  )
}

export default Role
