import React, {useState} from 'react'
import {Modal, Button} from 'antd'
import {ColumnsType} from 'antd/lib/table'
import VBasicTable from 'comps/VBasicTable'
import './index.less'

interface IMenuProps {}

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
]

const dataSource = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake ParkNew York No.',
    leve: 1,
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        leve: 2,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        leve: 2,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            leve: 3,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        leve: 2,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            leve: 3,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                leve: 4,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                leve: 4,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    leve: 1,
    address: 'Sidney No. 1 Lake Park',
  },
]

const Menu: React.FC<IMenuProps> = () => {
  const othersNodeHeight = 140

  const [visiable, SetVisiable] = useState(false)

  const formItems: any[] = [
    {
      type: 'input',
      label: '菜单名称',
      name: 'menuName',
      value: '',
    },
    {
      type: 'select',
      label: '昵称',
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

  const handleFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="app-container" style={{overflow: 'hidden'}}>
      <VBasicTable
        dataSource={dataSource}
        columns={columns}
        title="菜单列表"
        addBtnText="新增菜单"
        formItems={formItems}
        othersNodeHeight={othersNodeHeight}
        onFinish={handleFinish}
      />
      <Modal
        onCancel={() => SetVisiable(false)}
        visible={visiable}
        title="modal title"
      >
        <p>test ...............</p>
      </Modal>
      <Button onClick={() => SetVisiable(!visiable)}>open modal</Button>
    </div>
  )
}

export default Menu
