import React from 'react'
import {Layout} from 'antd'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import {Dispatch} from 'redux'
import Logo from './Logo'
import Menu from './Menu'
const {Sider} = Layout
import './index.less'

interface ILayoutSiderProps {}

const LayoutSider: React.FC<ILayoutSiderProps & IProps> = props => {
  const {sidebarCollapsed, showLogo} = props

  return (
    <Sider collapsed={sidebarCollapsed} className="layout-sidebar-container">
      {showLogo && <Logo sidebarCollapsed={sidebarCollapsed} />}
      <Menu />
    </Sider>
  )
}

// 映射state到组件的props
const mapStateToProps = (state: StoreStateProps) => ({
  sidebarCollapsed: state.app.sidebarCollapsed,
  showLogo: state.settings.showLogo,
})

// 映射dispatch到组件的props上
const mapDispatchToProps = (dispatch: Dispatch) => ({})

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSider)
