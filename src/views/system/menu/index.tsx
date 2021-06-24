import React, {useEffect, useState, useRef, useMemo} from 'react'
import {ColumnsType} from 'antd/lib/table'
import VBasicTable from 'comps/VBasicTable'
import {Button, Divider, Popconfirm, Tag, message} from 'antd'
import {getMenuList, addMenu, updateMenu, removeMenu} from 'apis/menu'
import {MenuProps, MenuStatus, MenuType} from 'apis/models/menuModel'
import {HttpStatusCode} from 'apis/index'
import {treeDataTranslate} from 'utils/index'
import Icon from 'comps/Icon'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import VBasicDrawerForm, {DrawerFormImperative} from 'comps/VBasicDrawerForm'
import {ResponseData} from 'apis/index'
import './index.less'
import {filterObjFields} from 'root/src/utils/utils'

interface IMenuProps {}

/** 表格分页参数 */
interface TablePagination {
  pageNumber?: number
  pageSize?: number
  total?: number
}

/** 查询角色列表筛选参数 */
interface FilterParams {
  name: string
  status: MenuStatus | string
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

const othersNodeHeight = 140

const Menu: React.FC<IMenuProps> = () => {
  /** 菜单树 */
  const [treeMenu, setTreeMenu] = useState<any[]>([])
  /** 切换表格刷新 */
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  /** 表格loading加载状态 */
  const [tableLoading, setTableLoading] = useState(false)
  /** 筛选查询参数 */
  const [filterParams, setFilterParams] = useState<FilterParams>(
    initFilterParams,
  )
  /** 分页参数 */
  // const [pagination, setPagination] = useState<TablePagination>(initPagination)

  /** 菜单类型 */
  const menuTypeRef = useRef<any>()

  /** 表单抽屉引用 */
  const drawerFormRef = useRef<DrawerFormImperative>(null)

  /** 表单抽屉字段配置项 */
  const formFields: IFormItemProps[] = [
    {
      type: 'input',
      label: '菜单名称',
      name: 'name',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入菜单名称',
        },
      ],
    },
    {
      type: 'tree-select',
      label: '上级菜单',
      name: 'parentId',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择上级菜单',
        },
      ],
      payload: [
        {
          key: '0',
          title: '系统根目录',
          children: treeMenu,
        },
      ],
    },
    {
      type: 'radio-group',
      label: '菜单类型',
      name: 'type',
      value: MenuType.M,
      rules: [
        {
          required: true,
          message: '请选择菜单类型',
        },
      ],
      othersProps: {
        options: [
          {label: '目录', value: MenuType.M},
          {label: '菜单', value: MenuType.C},
          {label: '按钮', value: MenuType.B},
        ],
        onChange: (e: any) => {
          menuTypeRef.current = e.target.value
        },
      },
    },
    {
      type: 'icon-picker',
      name: 'icon',
      label: '菜单图标',
      value: '',
    },
    {
      type: 'radio-group',
      label: '菜单状态',
      name: 'status',
      value: MenuStatus.enable,
      rules: [
        {
          required: true,
          message: '请选择菜单状态',
        },
      ],
      othersProps: {
        options: [
          {label: '启用', value: MenuStatus.enable},
          {label: '禁用', value: MenuStatus.disable},
        ],
      },
    },
    {
      type: 'number',
      label: '显示排序',
      name: 'orderId',
      value: 0,
      rules: [
        {
          required: true,
          message: '菜单显示排序不能为空',
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
      label: '路由地址',
      name: 'path',
      value: '',
      rules: [
        {
          validator: (_, value) => {
            /** 菜单类型为按钮 */
            if (menuTypeRef.current === MenuType.B) {
              return Promise.resolve()
            }
            /** 菜单类型为目录，菜单 */
            if (menuTypeRef.current !== MenuType.B && !value) {
              return Promise.reject('请输入路由地址')
            }
            return Promise.resolve()
          },
        },
      ],
    },
    {
      type: 'input',
      label: '权限标识',
      name: 'perms',
      value: '',
      othersProps: {
        placeholder: '权限标识如system:user:list',
      },
    },
  ]

  /** 查询筛选表单配置字段 */
  const formItems = useMemo<IFormItemProps[]>(
    () => [
      {
        type: 'input',
        label: '菜单名称',
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
              value: MenuStatus.enable,
            },
            {
              label: '禁用',
              value: MenuStatus.disable,
            },
          ],
        },
      },
    ],
    [],
  )

  /** 表格字列段配置 */
  const columns: ColumnsType<any> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      /* eslint-disable-next-line */
      render: text => {
        return <Icon icon={text} />
      },
    },
    {
      title: '排序',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
    },
    {
      title: '组件路径',
      dataIndex: 'path',
      key: 'path',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      // eslint-disable-next-line
      render: type => {
        let color = '#409EFF'
        let text = '目录'
        if (type === MenuType.C) {
          color = '#85CE61'
          text = '菜单'
        }
        if (type === MenuType.B) {
          color = '#E6A23C'
          text = '按钮'
        }
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      // eslint-disable-next-line
      render: status => {
        const color = status == MenuStatus.disable ? 'volcano' : 'green'
        const text = status == MenuStatus.disable ? '禁用' : '启用'
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 180,
      key: 'operation',
      // eslint-disable-next-line
      render: (text, record) => {
        return (
          <>
            <Button
              onClick={handleUpdateItem.bind(null, record as any)}
              type="link"
              size="small"
              icon={<Icon icon="FormOutlined" />}
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
                icon={<Icon icon="DeleteOutlined" />}
              />
            </Popconfirm>
            <Divider type="vertical" dashed />
            {record.type !== MenuType.B && (
              <Button
                onClick={handleAddChild.bind(null, record)}
                size="small"
                type="text"
                style={{color: '#85CE61'}}
              >
                新增
              </Button>
            )}
          </>
        )
      },
    },
  ]

  /** 请求菜单列表 */
  useEffect(() => {
    setTableLoading(true)
    getMenuList(filterParams)
      .then(response => {
        const {data, code} = response.data
        if (code === HttpStatusCode.OK) {
          const res = treeDataTranslate(data, '_id', 'parentId', {
            key: '_id',
            title: 'name',
          })
          setTreeMenu(res)
        }
      })
      .finally(() => {
        setTableLoading(false)
      })
  }, [toggleRefreshTable])

  // 处理删除列表项
  const handleRemoveItem = (item: MenuProps) => {
    removeMenu<ResponseData>(item._id).then(response => {
      const res = response.data
      if (res.code === HttpStatusCode.OK) {
        message.success(res.message || 'success')
        setToggleRefreshTable(f => !f)
      }
    })
  }

  /** 处理重置查询筛选表单 */
  const handleReset = () => {
    setFilterParams(initFilterParams)
    setToggleRefreshTable(f => !f)
  }

  /** 处理刷新表格数据 */
  const handleRefresh = () => {
    setToggleRefreshTable(f => !f)
  }

  /** 处理提交查询表单 */
  const handleFinish = (values: any) => {
    setFilterParams(values)
    setToggleRefreshTable(f => !f)
  }

  /** 根据菜单类型获取后端需要的字段 */
  const getNeedFieldByMenuType = (values: any, type: any) => {
    let res = values
    if (type == MenuType.M) {
      res = filterObjFields(values, ['perms'])
    }
    if (type == MenuType.B) {
      res = filterObjFields(values, ['path', 'icon'])
    }
    return res
  }

  // 点击新增列表项
  const handleAddBtnClick = () => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    menuTypeRef.current = MenuType.M
    openFormDrawer((values: MenuProps) => {
      const res = getNeedFieldByMenuType(values, menuTypeRef.current)
      addMenu<ResponseData>(res)
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

  // 当前菜单增加子菜单
  const handleAddChild = (item: MenuProps) => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    menuTypeRef.current = MenuType.M
    openFormDrawer(
      (values: any) => {
        const res = getNeedFieldByMenuType(values, menuTypeRef.current)
        console.log(res)
        addMenu<ResponseData>(res)
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
      {parentId: item._id, type: MenuType.M, status: MenuStatus.enable},
    )
  }

  // 更新列表项
  const handleUpdateItem = (item: MenuProps) => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    menuTypeRef.current = item.type
    openFormDrawer((values: MenuProps) => {
      updateMenu<ResponseData>(item._id, values).then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          message.success(res.message || 'success')
          closeFormDrawer()
          setToggleRefreshTable(f => !f)
        }
      })
    }, item)
  }

  return (
    <div className="app-container" style={{overflow: 'hidden'}}>
      <VBasicTable
        dataSource={treeMenu}
        columns={columns}
        title="菜单列表"
        loading={tableLoading}
        addBtnText="新增菜单"
        addBtnClick={handleAddBtnClick}
        formItems={formItems}
        othersNodeHeight={othersNodeHeight}
        onRefresh={handleRefresh}
        onReset={handleReset}
        onFinish={handleFinish}
        pagination={false}
      />

      <VBasicDrawerForm
        ref={drawerFormRef}
        title="菜单"
        formItems={formFields}
      />
    </div>
  )
}

export default Menu
