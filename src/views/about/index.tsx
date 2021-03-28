import React from 'react'
import {Button, Form, Input, Tree} from 'antd'
import TypingCard from 'comps/TypingCard'
import VBasicModalForm, {ModalFormImperativeProps} from 'comps/VBasicModalForm'
import VBasicForm from 'comps/vBasicForm'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons'

interface IHomeProps {}

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
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined />},
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined />},
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined />}],
      },
      {
        title: 'parent 1-2',
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
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
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

const Home: React.FC<IHomeProps> = () => {
  const modalFormRef = React.useRef<ModalFormImperativeProps>()

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
      type: 'select',
      label: '所属部门',
      name: 'depts',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择所属部门',
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
      name: 'tel',
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

  const data = {
    username: '11',
    password: '22',
    roles: '',
    depts: '',
    nickname: '',
    email: '',
    tel: '',
    description: '',
  }

  const handleClick = () => {
    // eslint-disable-next-line
    const {openModalForm} = modalFormRef.current!

    openModalForm(values => {
      console.log(values)
    }, data)
  }

  const items: IFormItemProps[] = [
    {
      type: 'tree-select',
      label: '所属部门',
      name: 'department',
      value: '0-0',
      rules: [
        {
          required: true,
          message: '请选择部门',
        },
      ],
      payload: treeData,
    },
    {
      type: 'number',
      label: '排序号',
      name: 'orderId',
      value: '',
      rules: [
        {
          required: true,
          message: '请输入排序号',
        },
      ],
      othersProps: {
        min: 0,
      },
    },
  ]

  return (
    <div className="app-container">
      <TypingCard title="关于作者" source="大家好呀！" />

      <Button onClick={handleClick}>Add User</Button>

      <VBasicModalForm
        ref={modalFormRef}
        title="title"
        formItems={formFields}
      />

      <VBasicForm
        formItems={items}
        onFinish={value => {
          console.log(value)
        }}
        onReset={() => {
          return
        }}
      />

      <Form
        onFinish={values => {
          console.log(values)
        }}
      >
        <Form.Item label="菜单权限" name="menuIds">
          <Tree treeData={iconTreeData} checkable showIcon />
        </Form.Item>
        <Form.Item label="米" name="a">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Home
