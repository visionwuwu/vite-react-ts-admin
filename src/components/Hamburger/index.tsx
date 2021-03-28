import React from 'react'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import {Dispatch} from 'redux'
import {sidebarCollapsedToggle} from 'store/actions/app'
import './index.less'

interface IHamburgerProps {}

const Hamburger: React.FC<IHamburgerProps & IProps> = props => {
  const {sidebarCollapsedToggle} = props

  return (
    <div className="hamburger-container">
      {!props.sidebarCollapsed ? (
        <MenuFoldOutlined onClick={sidebarCollapsedToggle} />
      ) : (
        <MenuUnfoldOutlined onClick={sidebarCollapsedToggle} />
      )}
    </div>
  )
}

const mapStateToProps = (state: StoreStateProps) => ({
  sidebarCollapsed: state.app.sidebarCollapsed,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sidebarCollapsedToggle() {
    dispatch(sidebarCollapsedToggle())
  },
})

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger)
