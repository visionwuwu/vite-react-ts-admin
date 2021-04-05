import React, {CSSProperties, memo} from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Avatar, Modal, Menu, Typography} from 'antd'
import Icon from 'comps/Icon'
import store, {useAppSelector} from 'store/index'
import {logout} from 'store/actions'
import avatarImg from '@/assets/images/avatar.jpg'
const {confirm} = Modal
const {Text} = Typography

interface IUserAvatarDorpdownProps {}

function handleLogout() {
  confirm({
    title: '注销',
    icon: <Icon icon="QuestionCircleOutlined" />,
    content: '确定要退出系统吗?',
    cancelText: '取消',
    okText: '确认',
    visible: false,
    onOk: () => {
      store.dispatch<any>(logout())
    },
  })
}

const menu = (
  <Menu>
    <Menu.Item key="home">
      <Link to="/dashboard">首页</Link>
    </Menu.Item>
    <Menu.Item key="project">
      <a href="https://github.com/visionwuwu/react-antd-admin-visionwu">
        项目地址
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={handleLogout}>注销</Menu.Item>
  </Menu>
)

const UserAvatarDorpdown: React.FC<IUserAvatarDorpdownProps> = () => {
  const username = useAppSelector(state => state.user.username)

  const textStyle: CSSProperties = {
    fontSize: '14px',
  }

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <div className="user-avatar-dropdown">
        <Avatar shape="circle" src={avatarImg} size={24}></Avatar>
        <Text className="ml-3" style={textStyle}>
          {username}
        </Text>
      </div>
    </Dropdown>
  )
}

export default memo(UserAvatarDorpdown)
