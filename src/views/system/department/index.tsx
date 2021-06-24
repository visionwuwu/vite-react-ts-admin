import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ColumnsType} from 'antd/lib/table/interface'
import VBasicTable from 'comps/VBasicTable'
import {Button, Popconfirm, Divider, message, Tag} from 'antd'
import {DeleteOutlined, FormOutlined} from '@ant-design/icons'
import {
  getDepartmentList,
  addDepartment,
  updateDepartment,
  removeDepartment,
  selectDepartment,
} from 'apis/department'
import {
  DepartmentQueryParams,
  DepartmentProps,
  DepartmentStatus,
} from 'apis/models/departmentModel'
import {ResponseData} from 'apis/index'
import {HttpStatusCode} from 'mock/index'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import VBasicDrawerForm, {DrawerFormImperative} from 'comps/VBasicDrawerForm'
import {treeDataTranslate} from 'utils/index'
import {isPhone, validEmail} from 'root/src/utils/validate'
import './index.less'

interface IDepartmentProps {}

/** 查询部门列表筛选参数 */
interface FilterParams {
  name: string
  status: DepartmentStatus | string
}

/** 初始筛选数据 */
const initFilterParams = {
  name: '',
  status: '',
}

const othersHeight = 218

const Department: React.FC<IDepartmentProps> = () => {
  /** 部门列表 */
  const [departmentList, setDepartmentList] = useState<any[]>([])
  /** 表格刷新标识 */
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  /** 表格loading加载状态 */
  const [tableLoading, setTableLoading] = useState(false)
  /** 抽屉表单组件引用 */
  const drawerFormRef = useRef<DrawerFormImperative>(null)
  // eslint-disable-next-line
  const [filterParams, setFilterParams] = useState<FilterParams>({
    name: '',
    status: '',
  })
  /** 下拉部门列表 */
  const [selectDeptList, setSelectDeptList] = useState<any[]>([])

  /** 部门表格列 */
  const columns: ColumnsType<any> = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排序',
      dataIndex: 'orderId',
      align: 'center',
      key: 'orderId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      // eslint-disable-next-line
      render: status => {
        const text = status == DepartmentStatus.enable ? '正常' : '停用'
        const color = status == DepartmentStatus.enable ? 'green' : 'red'
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      key: 'createTime',
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
              onClick={handleAddChild.bind(null, record)}
              size="small"
              type="text"
              style={{color: '#85CE61'}}
            >
              新增
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
        label: '部门名称',
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
              value: DepartmentStatus.enable,
            },
            {
              label: '禁用',
              value: DepartmentStatus.disable,
            },
          ],
        },
      },
    ],
    [],
  )

  const formFields: IFormItemProps[] = [
    {
      type: 'tree-select',
      label: '上级部门',
      name: 'parentId',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择上级部门',
        },
      ],
      payload: selectDeptList,
    },
    {
      type: 'input',
      label: '部门名称',
      name: 'name',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入部门名称',
        },
      ],
    },
    {
      type: 'number',
      label: '显示排序',
      name: 'orderId',
      value: 0,
      rules: [
        {
          required: true,
          message: '显示排序不能为空',
        },
      ],
      othersProps: {
        style: {
          width: '65%',
        },
        min: 0,
      },
    },
    {
      type: 'input',
      label: '负责人',
      name: 'leader',
      value: '',
    },
    {
      type: 'input',
      label: '联系电话',
      name: 'mobile',
      value: '',
      rules: [
        {
          validator: (_, val) => {
            if (!val) return Promise.resolve()
            return isPhone(val)
              ? Promise.resolve()
              : Promise.reject('请输入正确的手机号码')
          },
        },
      ],
    },
    {
      type: 'input',
      label: '邮箱',
      name: 'email',
      value: '',
      rules: [
        {
          validator: (_, val) => {
            if (!val) return Promise.resolve()
            return validEmail(val)
              ? Promise.resolve()
              : Promise.reject('请输入正确的手机号码')
          },
        },
      ],
    },
    {
      type: 'radio-group',
      label: '部门状态',
      name: 'status',
      value: DepartmentStatus.enable,
      rules: [
        {
          required: true,
          message: '请选择部门状态',
        },
      ],
      othersProps: {
        options: [
          {label: '启用', value: DepartmentStatus.enable},
          {label: '禁用', value: DepartmentStatus.disable},
        ],
      },
    },
  ]

  /** 获取部门列表 */
  useEffect(() => {
    setTableLoading(true)
    getDepartmentList<ResponseData>(filterParams)
      .then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          const list = treeDataTranslate(res.data, '_id', 'parentId', {
            key: '_id',
            title: 'name',
          })
          setDepartmentList(list)
        }
      })
      .finally(() => {
        setTableLoading(false)
      })
  }, [toggleRefreshTable])

  /** 以下是处理方法 */
  // 处理删除列表项
  const handleRemoveItem = (item: DepartmentProps) => {
    removeDepartment<ResponseData>(item._id).then(response => {
      const res = response.data
      if (res.code === HttpStatusCode.OK) {
        message.success(res.message || 'success')
        setToggleRefreshTable(f => !f)
      }
    })
  }

  // 更新列表项
  const handleUpdateItem = async (item: DepartmentProps) => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    const res = await selectDepartment<ResponseData>(item._id)
    let selectDeptList = []
    if (res.data.code === HttpStatusCode.OK) {
      selectDeptList = treeDataTranslate(res.data.data, '_id', 'parentId', {
        key: '_id',
        title: 'name',
      })
      setSelectDeptList(selectDeptList)
    }
    console.log(selectDeptList)
    openFormDrawer(
      (values: DepartmentProps) => {
        updateDepartment<ResponseData>(item._id, values).then(response => {
          const res = response.data
          if (res.code === HttpStatusCode.OK) {
            message.success(res.message || 'success')
            closeFormDrawer()
            setToggleRefreshTable(f => !f)
          }
          console.log(res)
        })
      },
      {
        ...item,
      },
    )
  }
  // eslint-disable-next-line
  const handleReset = () => {
    setFilterParams(initFilterParams)
    setToggleRefreshTable(f => !f)
  }
  // eslint-disable-next-line
  const handleRefresh = () => {
    setToggleRefreshTable(f => !f)
  }

  const handleFinish = (values: FilterParams) => {
    setFilterParams(values)
    setToggleRefreshTable(f => !f)
  }

  /** 新增部门 */
  const handleAddBtnClick = () => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    setSelectDeptList([{key: '0', title: '顶级菜单'}])
    openFormDrawer(
      (values: any) => {
        addDepartment<ResponseData>(values).then(response => {
          const res = response.data
          if (res.code === HttpStatusCode.OK) {
            message.success(res.message || 'success')
            closeFormDrawer()
            setToggleRefreshTable(f => !f)
          }
        })
      },
      {
        parentId: '0',
      },
    )
  }

  // 当前部门增加子部门
  const handleAddChild = (item: DepartmentProps) => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    setSelectDeptList(departmentList)
    openFormDrawer(
      (values: any) => {
        addDepartment<ResponseData>(values)
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
      {parentId: item._id},
    )
  }

  return (
    <div className="app-container" style={{overflow: 'hidden'}}>
      <VBasicTable
        dataSource={departmentList}
        columns={columns}
        title="部门列表"
        addBtnText="新增部门"
        addBtnClick={handleAddBtnClick}
        loading={tableLoading}
        formItems={formItems}
        othersNodeHeight={othersHeight}
        onReset={handleReset}
        onRefresh={handleRefresh}
        onFinish={handleFinish}
        pagination={false}
      />

      <VBasicDrawerForm
        title="部门"
        ref={drawerFormRef}
        formItems={formFields}
      />
    </div>
  )
}

export default Department
