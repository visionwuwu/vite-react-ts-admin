import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {ColumnsType} from 'antd/lib/table/interface'
import VBasicTable from 'comps/VBasicTable'
import {Button, Popconfirm, Divider, message, Tag} from 'antd'
import {DeleteOutlined, FormOutlined} from '@ant-design/icons'
import {getDepartmentList} from 'apis/department'
import {DepartmentQueryParams} from 'apis/models/departmentModel'
import {ResponseData} from 'apis/index'
import {HttpStatusCode} from 'mock/index'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import {treeDataTranslate} from 'utils/index'
import './index.less'

interface IDepartmentProps {}

const Department: React.FC<IDepartmentProps> = () => {
  /** 部门列表 */
  const [departmentList, setDepartmentList] = useState<any[]>([])
  const [toggleRefreshTable, setToggleRefreshTable] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  // eslint-disable-next-line
  const [queryParams, setQueryParams] = useState<DepartmentQueryParams>({
    deptName: '',
    status: '',
  })
  const othersHeight = useMemo(() => {
    return 218
  }, [])

  /** 部门表格列 */
  const columns: ColumnsType<any> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      align: 'center',
      key: 'orderNum',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      // eslint-disable-next-line
      render: status => {
        const text = status == '0' ? '正常' : '停用'
        const color = status == '0' ? 'green' : 'red'
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
  const formItems: IFormItemProps[] = [
    {
      type: 'input',
      label: '部门名称',
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

  /** 封装请求部门列表函数 */
  const requestRoles = useCallback(() => {
    setTableLoading(true)
    getDepartmentList<ResponseData>(queryParams)
      .then(response => {
        const res = response.data
        if (res.code === HttpStatusCode.OK) {
          message.success(res.message || 'success')
          const list = treeDataTranslate(res.data, 'deptId', 'parentId', {
            key: 'deptId',
            title: 'deptName',
          })
          console.log(list)
          setDepartmentList(list)
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

  /** 以下是处理方法 */
  const handleUpdateItem = () => {
    return
  }

  const handleRemoveItem = () => {
    return
  }
  // eslint-disable-next-line
  const handleReset = () => {
    setToggleRefreshTable(f => !f)
  }
  // eslint-disable-next-line
  const handleRefresh = () => {
    setToggleRefreshTable(f => !f)
  }

  const handleFinish = () => {
    setToggleRefreshTable(f => !f)
  }

  return (
    <div className="app-container" style={{overflow: 'hidden'}}>
      <VBasicTable
        dataSource={departmentList}
        columns={columns}
        title="部门列表"
        addBtnText="新增部门"
        loading={tableLoading}
        formItems={formItems}
        othersNodeHeight={othersHeight}
        onFinish={handleFinish}
      />
    </div>
  )
}

export default Department
