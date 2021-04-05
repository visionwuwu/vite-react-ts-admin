import React, {CSSProperties, memo} from 'react'
import {Link} from 'react-router-dom'
import logo from '@/assets/images/logo.svg'
import classnames from 'classnames'
import './index.less'

interface ILogoProps {
  style?: CSSProperties
  classNames?: string
  showTitle?: boolean
}

const Logo: React.FC<ILogoProps> = props => {
  const {showTitle, classNames, style} = props
  const classes = classnames('sidebar-logo-container', classNames)
  return (
    <div className={classes} style={style}>
      <Link to="/dashboard">
        <img className="sidebar-logo" src={logo} alt="logo" />
        {showTitle && <h1 className="sidebar-title">橙晨燕</h1>}
      </Link>
    </div>
  )
}

Logo.defaultProps = {
  showTitle: true,
}

export default memo(Logo)
