import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ColumnsType} from 'antd/lib/table/interface'
import VBasictable from 'comps/VBasicTable'
import VBasicModalForm, {ModalFormImperativeProps} from 'comps/VBasicModalForm'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import {Button, Popconfirm, Divider, message, Tag} from 'antd'
import {DeleteOutlined, FormOutlined, CarryOutOutlined} from '@ant-design/icons'
import {addRole, getRoleList, updateRole} from 'apis/role'
import {RoleProps, RoleQueryParams} from 'apis/models/roleModel'
import {ResponseData} from 'apis/index'
import {HttpStatusCode} from 'mock/index'
import './index.less'

interface IRoleProps {}

// eslint-disable-next-line
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
]

const iconTreeData = [
  {
    title: 'parent-1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent-1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined />},
          {
            title: 'dsd',
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined />},
        ],
      },
      {
        title: 'parent-1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined />}],
      },
      {
        title: 'parent-1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined />},
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent-2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent-2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined />},
          {title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined />},
        ],
      },
    ],
  },
]

const Role: React.FC<IRoleProps> = () => {
  /** 角色列表 */
  const [roleList, setRoleList] = useState([])
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const modalFormRef = useRef<ModalFormImperativeProps>()
  const [queryParams, setQueryParams] = useState<RoleQueryParams>({
    roleName: '',
    status: '',
  })
  const othersHeight = useMemo(() => {
    return 218
  }, [])

  /** 角色表格列 */
  const columns: ColumnsType<any> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
      key: 'roleName',
    },
    {
      title: '权限字符',
      dataIndex: 'roleKeys',
      align: 'center',
      key: 'roleKeys',
    },
    {
      title: '显示顺序',
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
        const text = status === 1 ? '启用' : '停用'
        const color = status === 1 ? 'green' : 'red'
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      key: 'createTime',
      render: () => {
        return new Date().toISOString()
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      // eslint-disable-next-line
      render: (text, user) => {
        return (
          <>
            <Button
              onClick={handleUpdateItem.bind(null, user as any)}
              type="link"
              size="small"
              icon={<FormOutlined />}
            />
            <Divider type="vertical" dashed />
            <Popconfirm title="是否确认删除?" okText="确认" cancelText="取消">
              <Button
                onClick={handleRemoveItem}
                type="link"
                danger
                size="small"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </>
        )
      },
    },
  ]

  /** 筛选表单项 */
  const formItems: any[] = [
    {
      type: 'input',
      label: '角色名称',
      name: 'roleName',
      value: '',
    },
    {
      type: 'select',
      label: '状态',
      name: 'status',
      value: '',
      payload: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  ]

  /** 弹框表单项 */
  const formFields: IFormItemProps[] = [
    {
      type: 'input',
      label: '角色名',
      name: 'roleName',
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
      value: '11',
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
      value: '0',
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
      value: 1,
      othersProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
    },
    {
      type: 'textarea',
      label: '描述',
      name: 'description',
      value: '',
    },
    {
      type: 'tree',
      label: '拥有菜单',
      name: 'menuIds',
      value: [],
      othersProps: {
        title: '菜单权限',
        treeData: iconTreeData,
      },
    },
  ]

  /** 封装请求角色列表函数 */
  const requestRoles = useCallback(() => {
    setTableLoading(true)
    getRoleList<ResponseData>(queryParams)
      .then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          message.success(res.message || 'success')
          setRoleList(res.data)
        }
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
      })
  }, [queryParams])

  /** 获取用户列表 */
  useEffect(() => {
    requestRoles()
  }, [toggleRefreshTable])

  const handleRemoveItem = () => {
    return
  }

  const handleReset = () => {
    setQueryParams({
      roleName: '',
      status: '',
    })
    setToggleRefreshTable(f => !f)
  }

  const handleRefresh = () => {
    setToggleRefreshTable(f => !f)
  }

  const handleFinish = (values: RoleQueryParams) => {
    setQueryParams({
      ...values,
    })
    setToggleRefreshTable(f => !f)
  }

  // 点击新增列表项
  const handleAddBtnClick = () => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    openModalForm((values: RoleProps) => {
      console.log(values)
      return
      addRole<ResponseData>(values).then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          message.success(res.message || 'success')
          closeModalForm()
          setToggleRefreshTable(f => !f)
        }
      })
    })
  }

  // 更新列表项
  const handleUpdateItem = (user: RoleProps) => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    openModalForm(
      (values: RoleProps) => {
        return
        updateRole<ResponseData>(user.id, values).then(response => {
          const res = response.data
          if (res.code === HttpStatusCode.OK) {
            message.success(res.message || 'success')
            closeModalForm()
            setToggleRefreshTable(f => !f)
          }
          console.log(res)
        })
      },
      {
        ...user,
      },
    )
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
      />

      {/* 表单弹框 */}
      <VBasicModalForm
        width={650}
        title="用户"
        ref={modalFormRef}
        formItems={formFields}
      />
    </div>
  )
}

export default Role
