import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  Tag,
  Avatar,
  Button,
  Divider,
  Popconfirm,
  message,
  Row,
  Col,
  Input,
  Switch,
} from 'antd'
import {InputProps, InputState} from 'antd/lib/input/Input'
import Icon from 'comps/Icon'
import VBasicModalForm, {ModalFormImperativeProps} from 'comps/VBasicModalForm'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import VBasicTable from 'comps/VBasicTable'
import VBasicTree from 'comps/VBasicTree'
import VBasicModal, {ModalImperativeProps} from 'comps/VBasicModal'
import {
  addUser,
  getUserList,
  updateUser,
  removeUser,
  resetPwd,
  changeUserStatus,
} from 'apis/user'
import {ownDeptTree} from 'apis/department'
import {treeDataTranslate} from 'utils/index'
import {ResponseData, HttpStatusCode} from 'apis/index'
import {
  SexEnum,
  UserProps,
  UserQueryParams,
  UserStatus,
  UserType,
} from 'apis/models/userModel'
import {UserStateProps} from 'store/reducers/user'
import {Key} from 'rc-tree/lib/interface'
import {ColumnsType} from 'antd/es/table'
import AvatarImg from 'assets/images/avatar.jpg'
import {getRoleList, selectRole} from 'root/src/api/role'
import {isPhone, validEmail} from 'root/src/utils/validate'
import './index.less'

interface IAccountProps {}

/** 表格分页参数 */
interface TablePagination {
  pageNumber?: number
  pageSize?: number
  total?: number
}

const initPagination = {
  pageNumber: 1,
  pageSize: 10,
  total: 0,
}

const initQueryParams = {
  username: '',
  nickname: '',
  deptId: '',
}

const othersHeight = 218

const Account: React.FC<IAccountProps> = () => {
  /** 表格loading加载状态 */
  const [tableLoading, setTableLoading] = useState(false)
  /** 表格数据 */
  const [dataSource, setDataSource] = useState<UserStateProps[]>([])
  /** 部门树数据 */
  const [deptList, setDeptList] = useState<any[]>([])
  /** 分页参数 */
  const [pagination, setPagination] = useState<TablePagination>(initPagination)
  /** 下拉角色列表 */
  const [selectRoleList, setSelectRoleList] = useState<any[]>([])
  /** 新增/编辑 标识 */
  const [isEdit, setIsEdit] = useState(false)
  /** 当前编辑对象 */
  const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps)

  /** 重置密码弹框引用 */
  const resetPwdModalRef = useRef<ModalImperativeProps>()

  /** 重置密码框引用 */
  const resetPwdInputRef = useRef<
    React.Component<InputProps, InputState> | any
  >()

  /** 用户列表筛选查询参数 */
  const [queryParams, setQueryParams] = useState<UserQueryParams>(
    initQueryParams,
  )

  /** 是否刷新表格标识 */
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)

  /** 弹框表单ref引用 */
  const modalFormRef = useRef<ModalFormImperativeProps>()

  /** 表格列字段 */
  const columns: ColumnsType<UserStateProps> = [
    {
      key: 1,
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      width: 80,
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
      ellipsis: true,
    },
    {
      key: 5,
      title: '头像',
      dataIndex: 'avatar',
      align: 'center',
      width: 100,
      // eslint-disable-next-line
      render: url => {
        const src = url ? url : AvatarImg
        return <Avatar src={src} />
      },
    },
    // {
    //   key: 8,
    //   title: '状态',
    //   dataIndex: 'status',
    //   align: 'center',
    //   width: 100,
    //   // eslint-disable-next-line
    //   render: (status: any) => {
    //     const color = status ? 'geekblue' : 'green'
    //     return <Tag color={color}>{status ? '启用' : '禁用'}</Tag>
    //   },
    // },
    {
      key: 111,
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 200,
      // eslint-disable-next-line
      render: (status: any, record: any) => {
        const hasChecked = status === UserStatus.enable
        const color = hasChecked ? '#85CE61' : '#F56C6C'
        const title = `确认要"${hasChecked ? '停用' : '启用'}""${
          record.nickname
        }"用户吗?`
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
      key: 6,
      title: '角色',
      dataIndex: 'roles',
      align: 'center',
      width: 100,
    },
    {
      key: 7,
      title: '描述',
      dataIndex: 'remark',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      width: 180,
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
              icon={<Icon icon="FormOutlined" />}
            />
            <Divider type="vertical" dashed />
            <Popconfirm
              onConfirm={handleRemoveItem.bind(null, user as any)}
              title="是否确认删除?"
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="link"
                danger
                size="small"
                icon={<Icon icon="DeleteOutlined" />}
              />
            </Popconfirm>
            <Divider type="vertical" dashed />
            <Button
              onClick={handleResetPwd.bind(null, user as any)}
              type="text"
              style={{color: '#85CE61'}}
              size="small"
            >
              重置密码
            </Button>
          </>
        )
      },
    },
  ]

  /** 弹框表单项配置字段 */
  const formFields: IFormItemProps[] = [
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
        {
          max: 20,
          message: '用户名长度不能超过20位',
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
          required: !isEdit,
          message: '请输入密码',
        },
        {
          min: 6,
          message: '密码长度不能小于6',
        },
        {
          max: 15,
          message: '密码长度不能大于15',
        },
      ],
      othersProps: {
        disabled: isEdit,
      },
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
      type: 'select',
      label: '角色',
      name: 'roleIdList',
      value: [],
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择角色',
      //   },
      // ],
      othersProps: {
        mode: 'multiple',
        options: selectRoleList.map(role => ({
          label: role.name,
          value: role._id,
        })),
      },
    },
    {
      type: 'tree-select',
      label: '所属部门',
      name: 'deptId',
      value: '',
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择部门',
      //   },
      // ],
      payload: treeDataTranslate(deptList, '_id', 'parentId', {
        key: '_id',
        title: 'name',
      }),
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
        {
          validator: (_, value) => {
            return isPhone(value)
              ? Promise.resolve()
              : Promise.reject('请输入合法的手机号')
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
          required: true,
          message: '请输入邮箱',
        },
        {
          validator: (_, value) => {
            return validEmail(value)
              ? Promise.resolve()
              : Promise.reject('请输入合法的邮箱号')
          },
        },
      ],
    },
    {
      type: 'radio-group',
      label: '性别',
      name: 'sex',
      value: SexEnum.male,
      othersProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '男',
            value: SexEnum.male,
          },
          {
            label: '女',
            value: SexEnum.female,
          },
          {
            label: '未知',
            value: SexEnum.unknown,
          },
        ],
      },
    },
    {
      type: 'radio-group',
      label: '角色状态',
      name: 'status',
      value: UserStatus.enable,
      othersProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '启用',
            value: UserStatus.enable,
          },
          {
            label: '禁用',
            value: UserStatus.disable,
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
  ]

  // 条件查询筛选表单配置字段
  const formItems: any[] = useMemo(
    () => [
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
    ],
    [],
  )

  // 获取用户列表
  useEffect(() => {
    requestUsers({...queryParams, ...pagination})
  }, [toggleRefreshTable])

  // 获取部门列表
  useEffect(() => {
    ownDeptTree<ResponseData>().then(response => {
      const res = response.data
      const list = treeDataTranslate(res.data, '_id', 'parentId', {
        key: '_id',
        title: 'name',
      })
      setDeptList(list)
    })
  }, [])

  /** 获取角色列表 */
  useEffect(() => {
    selectRole<ResponseData>().then(response => {
      const {data} = response
      if (data.code === HttpStatusCode.OK) {
        setSelectRoleList(data.data)
      }
    })
  }, [])

  // 请求用户列表数据
  const requestUsers = (queryParams: any) => {
    delete queryParams.total
    setTableLoading(true)
    getUserList<ResponseData>(queryParams)
      .then(response => {
        const {data, total} = response.data
        setDataSource(data)
        setPagination(p => ({...p, total}))
      })
      .finally(() => setTableLoading(false))
  }

  // 表单提交
  const handleFinish = useCallback(
    (values: any) => {
      setQueryParams(query => ({...query, ...values}))
      setPagination(initPagination)
      setToggleRefreshTable(f => !f)
    },
    [setQueryParams, setToggleRefreshTable],
  )

  // 处理重置
  const handleReset = useCallback(() => {
    setQueryParams(initQueryParams)
    setPagination(initPagination)
    setToggleRefreshTable(f => !f)
  }, [setQueryParams, setToggleRefreshTable])

  // 处理刷新
  const handleRefresh = useCallback(() => {
    setToggleRefreshTable(f => !f)
  }, [])

  // 点击新增列表项
  const handleAddBtnClick = () => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    setIsEdit(false)
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

  // 处理删除列表项
  const handleRemoveItem = (user: any) => {
    removeUser<ResponseData>(user._id).then(response => {
      const res = response.data
      if (res.code === HttpStatusCode.OK) {
        message.success(res.message || 'success')
        setToggleRefreshTable(f => !f)
      }
    })
  }

  // 更新列表项
  const handleUpdateItem = (user: UserProps) => {
    const {openModalForm, closeModalForm} = modalFormRef.current!
    setIsEdit(true)
    openModalForm(
      (values: UserProps) => {
        updateUser<ResponseData>(user._id, {...values, type: user.type}).then(
          response => {
            const res = response.data
            if (res.code === HttpStatusCode.OK) {
              message.success(res.message || 'success')
              closeModalForm()
              setToggleRefreshTable(f => !f)
            }
            console.log(res)
          },
        )
      },
      {
        ...user,
        menuIcon: 'FileOutlined',
      },
    )
  }

  // 重置密码
  const handleResetPwd = (user: UserProps) => {
    const {openModal, closeModal} = resetPwdModalRef.current!
    const instance = resetPwdInputRef.current
    instance && instance.handleReset()
    openModal(() => {
      if (instance) {
        const value = instance.state.value
        if (!value) {
          return message.warning('新密码不能为空')
        }
        resetPwd<ResponseData>(user._id, value, user.type as UserType)
          .then(response => {
            const {data} = response
            if (data.code === HttpStatusCode.OK) {
              message.success(data.message || '重置密码成功')
            }
          })
          .finally(() => {
            closeModal()
          })
      }
    })
    return
  }

  // 改变用户状态
  const handleChangeStatus = (...args: any) => {
    const record = args[0]
    const status =
      record.status === UserStatus.enable
        ? UserStatus.disable
        : UserStatus.enable
    changeUserStatus<ResponseData>(record._id, status, record.type).then(
      response => {
        const data = response.data
        if (data.code === HttpStatusCode.OK) {
          message.success(data.message || '更新成功')
          setToggleRefreshTable(f => !f)
        }
      },
    )
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

  /** 处理点击属节点触发 */
  const handleTreeKeySelect = (selectKeys: Key[]) => {
    setQueryParams(query => ({...query, deptId: selectKeys[0]}))
    setToggleRefreshTable(f => !f)
  }

  return (
    <div className="app-container h-full">
      <Row gutter={16}>
        <Col lg={5} md={24} sm={24} xs={24}>
          <VBasicTree
            title="部门列表"
            onSelect={handleTreeKeySelect}
            treeData={deptList}
          />
        </Col>
        <Col lg={19} md={24} sm={24} xs={24}>
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
              total: pagination.total,
            }}
          />
        </Col>
      </Row>
      {/* 表单弹框 */}
      <VBasicModalForm title="用户" ref={modalFormRef} formItems={formFields} />
      {/* 重置密码弹框 */}
      <VBasicModal title="提示" ref={resetPwdModalRef}>
        <p>请输入新密码</p>
        <Input ref={resetPwdInputRef as any} allowClear />
      </VBasicModal>
    </div>
  )
}

export default Account
