import React, {useRef} from 'react'
import TypingCard from 'comps/TypingCard'
import {Button} from 'antd'
import VBasicDrawerForm, {DrawerFormImperative} from 'comps/VBasicDrawerForm'
import {IFormItemProps} from 'comps/vBasicForm/components/FromItem'

interface IAdminProps {}

const Admin: React.FC<IAdminProps> = () => {
  const drawerFormRef = useRef<DrawerFormImperative>(null)
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
      type: 'icon-picker',
      name: 'menuIcon',
      label: '菜单图标',
      value: '',
      rules: [
        {
          required: true,
          message: '请选择图标',
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

  const handleClick = () => {
    const {openFormDrawer, closeFormDrawer} = drawerFormRef.current!
    openFormDrawer(() => {
      console.log('value')
    })
  }

  return (
    <div className="app-container">
      <TypingCard
        title="admin页面"
        source="这个页面只有admin角色才可以访问，guest和editor角色看不到"
      />

      <Button onClick={handleClick}>打开表单抽屉</Button>

      <VBasicDrawerForm
        ref={drawerFormRef}
        title="表单抽屉"
        formItems={formFields}
      />
    </div>
  )
}

export default Admin
