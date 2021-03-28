import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Tag, Avatar, Button, Divider, Popconfirm, message} from 'antd'
import {DeleteOutlined, FormOutlined} from '@ant-design/icons'
import VBasicModalForm, {ModalFormImperativeProps} from 'comps/VBasicModalForm'
import VBasicTable from 'comps/VBasicTable'
import VBasicTree from 'comps/VBasicTree'
import {addUser, getUserList, updateUser} from 'apis/user'
import {getDepartmentList} from 'apis/department'
import {treeDataTranslate} from 'utils/index'
import {ResponseData, HttpStatusCode} from 'apis/index'
import {UserProps, UserQueryParams} from 'apis/models/userModel'
import {UserStateProps} from 'store/reducers/user'
import {Key} from 'rc-tree/lib/interface'
import {ColumnsType} from 'antd/es/table'
import './index.less'

interface IAccountProps {}

const Account: React.FC<IAccountProps> = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [dataSource, setDataSource] = useState<UserStateProps[]>([])
  const [treeData, setTreeData] = useState<any[]>([])
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 2,
  })
  const [queryParams, setQueryParams] = useState<UserQueryParams>({
    username: '',
    nickname: '',
    key: '',
  })
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  const modalFormRef = useRef<ModalFormImperativeProps>()
  const columns: ColumnsType<UserStateProps> = [
    {
      key: 0,
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      width: 50,
    },
    {
      key: 1,
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      width: 150,
    },
    {
      key: 2,
      title: '昵称',
      dataIndex: 'nickname',
      align: 'center',
      width: 150,
    },
    {
      key: 3,
      title: '手机',
      dataIndex: 'mobile',
      align: 'center',
      width: 150,
    },
    {
      key: 4,
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      width: 150,
    },
    {
      key: 5,
      title: '头像',
      dataIndex: 'avatar',
      align: 'center',
      width: 150,
      // eslint-disable-next-line
      render: url => {
        return <Avatar src={url} />
      },
    },
    {
      key: 6,
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      width: 150,
    },
    {
      key: 7,
      title: '角色',
      dataIndex: 'roles',
      align: 'center',
      width: 150,
    },
    {
      key: 8,
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 150,
      // eslint-disable-next-line
      render: (status: any) => {
        const color = status ? 'geekblue' : 'green'
        return <Tag color={color}>{status ? '启用' : '禁用'}</Tag>
      },
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      fixed: 'right',
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
  const formFields: any[] = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
    },
    {
      type: 'password',
      label: '密码',
      name: 'password',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
    },
    {
      type: 'select',
      label: '角色',
      name: 'roles',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择角色',
        },
      ],
      payload: [
        {
          label: '超级管理员',
          value: 1,
        },
        {
          label: 'Editor管理员',
          value: 2,
        },
        {
          label: '游客',
          value: 3,
        },
      ],
    },
    {
      type: 'tree-select',
      label: '所属部门',
      name: 'department',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择部门',
        },
      ],
      payload: treeData,
    },
    {
      type: 'input',
      label: '昵称',
      name: 'nickname',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入昵称',
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
          required: true,
          message: '请输入邮箱',
        },
      ],
    },
    {
      type: 'input',
      label: '电话',
      name: 'mobile',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入电话',
        },
      ],
    },
    {
      type: 'textarea',
      label: '描述',
      name: 'description',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入描述',
        },
      ],
    },
  ]

  // 获取用户列表
  useEffect(() => {
    requestUsers({...queryParams, ...pagination})
  }, [toggleRefreshTable])

  // 获取部门列表
  useEffect(() => {
    getDepartmentList<ResponseData>().then(response => {
      const res = response.data
      const list = treeDataTranslate(res.data, 'deptId', 'parentId', {
        key: 'deptId',
        title: 'deptName',
      })
      setTreeData(list)
    })
  }, [])

  // 请求用户列表数据
  const requestUsers = (queryParams: any) => {
    setTableLoading(true)
    getUserList<ResponseData>(queryParams)
      .then(response => {
        const res = response.data
        setDataSource(res.data)
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
      })
  }

  const othersHeight = useMemo(() => {
    return 218
  }, [])

  // 表单项
  const formItems: any[] = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      value: '',
    },
    {
      type: 'input',
      label: '昵称',
      name: 'nickname',
      value: '',
    },
  ]

  // 表单提交
  const handleFinish = useCallback(
    (values: any) => {
      setQueryParams({
        username: values.username || '',
        nickname: values.nickname || '',
      })
      setToggleRefreshTable(f => !f)
    },
    [setQueryParams, setToggleRefreshTable],
  )

  // 处理重置
  const handleReset = useCallback(() => {
    setQueryParams({
      username: '',
      nickname: '',
    })
    setToggleRefreshTable(f => !f)
  }, [setQueryParams, setToggleRefreshTable])

  // 处理刷新
  const handleRefresh = useCallback(() => {
    setToggleRefreshTable(f => !f)
  }, [])

  // 点击新增列表项
  const handleAddBtnClick = () => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    openModalForm((values: UserProps) => {
      addUser<ResponseData>(values).then(response => {
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
  const handleUpdateItem = (user: UserProps) => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    openModalForm(
      (values: UserProps) => {
        updateUser<ResponseData>(user.id, values).then(response => {
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

  // 页码改变
  const handlePageChange = (page: number, pageSize?: number) => {
    if (pagination.pageNumber !== page) {
      setPagination({
        pageNumber: page,
        pageSize: pageSize || pagination.pageSize,
      })
      setToggleRefreshTable(f => !f)
    }
  }

  // 分页数量改变
  const handleSizeChange = (current: number, size: number) => {
    setPagination({
      pageNumber: current,
      pageSize: size,
    })
    setToggleRefreshTable(f => !f)
  }

  /** 处理点击属节点触发 */
  const handleTreeKeySelect = (selectKeys: Key[]) => {
    setQueryParams({
      key: selectKeys[0],
    })
    setToggleRefreshTable(f => !f)
  }

  return (
    <div className="app-container h-full">
      <div className="d-flex h-full">
        <div className="w-1/4">
          <VBasicTree
            title="部门列表"
            onSelect={handleTreeKeySelect}
            treeData={treeData}
          />
        </div>
        <div
          className="w-3/4"
          style={{paddingLeft: '16px', overflow: 'hidden'}}
        >
          <VBasicTable
            dataSource={dataSource}
            columns={columns}
            title="账号列表"
            addBtnText="新增用户"
            rowKey="id"
            othersNodeHeight={othersHeight}
            formItems={formItems}
            loading={tableLoading}
            onRefresh={handleRefresh}
            onFinish={handleFinish}
            onReset={handleReset}
            addBtnClick={handleAddBtnClick}
            pagination={{
              onChange: handlePageChange,
              onShowSizeChange: handleSizeChange,
              current: pagination.pageNumber,
              pageSize: pagination.pageSize,
            }}
          />
        </div>
      </div>

      {/* 表单弹框 */}
      <VBasicModalForm title="用户" ref={modalFormRef} formItems={formFields} />
    </div>
  )
}

export default Account
