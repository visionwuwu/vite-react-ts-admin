import React from 'react'
import {Link} from 'react-router-dom'
import {Layout, Dropdown, Menu, Avatar, Modal} from 'antd'
import {CaretDownOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import Hamburger from 'comps/Hamburger'
import Breadcrumb from 'comps/Breadcrumb'
import FullScreen from 'comps/FullScreen'
import Setting from 'comps/Setting'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import store from 'store/index'
import {logout} from 'store/actions'
import classnames from 'classnames'
import avatarImg from '@/assets/images/avatar.jpg'
const {Header} = Layout
const {confirm} = Modal
import './index.less'

interface ILayoutHeaderProps {}

function handleLogout() {
  confirm({
    title: '注销',
    icon: <QuestionCircleOutlined />,
    content: '确定要退出系统吗?',
    cancelText: '取消',
    okText: '确认',
    visible: false,
    onOk: () => {
      store.dispatch<any>(logout())
      console.log('ok')
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

const LayoutHeader: React.FC<ILayoutHeaderProps & IProps> = props => {
  const {fixHeader, sidebarCollapsed} = props

  const classes = classnames('layout-header', {
    'fix-header': fixHeader,
  })

  const headerStyle = {
    width: fixHeader
      ? `calc(100vw - ${sidebarCollapsed ? '80px' : '200px'})`
      : '100%',
  }

  return (
    <>
      <Header className={classes} style={headerStyle}>
        <div className="left-menu">
          <Hamburger />
          <Breadcrumb />
        </div>
        <div className="right-menu">
          <FullScreen />
          <Setting />
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className="dropdown-wrapper">
              <Avatar shape="square" src={avatarImg} size={32}></Avatar>
              <CaretDownOutlined />
            </div>
          </Dropdown>
        </div>
      </Header>
      {fixHeader ? <Header className="layout-header" /> : null}
    </>
  )
}

const mapStateToProps = (state: StoreStateProps) => ({
  sidebarCollapsed: state.app.sidebarCollapsed,
  fixHeader: state.settings.fixHeader,
})

type IProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(LayoutHeader)
