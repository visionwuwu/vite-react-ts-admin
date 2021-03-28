import React from 'react'
import {Link} from 'react-router-dom'
import logo from '@/assets/images/logo.svg'
import './index.less'

interface ILogoProps {
  sidebarCollapsed: boolean
}

const Logo: React.FC<ILogoProps> = props => {
  const {sidebarCollapsed} = props
  return (
    <div className="sidebar-logo-container">
      <Link to="/dashboard">
        <img className="sidebar-logo" src={logo} alt="logo" />
        {!sidebarCollapsed && <h1 className="sidebar-title">橙晨燕</h1>}
      </Link>
    </div>
  )
}

export default Logo
