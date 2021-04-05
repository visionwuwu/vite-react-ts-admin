import React, {memo, useState} from 'react'
import Icon from '../Icon'
import './index.less'

interface IHamburgerProps {
  /** 折叠状态 */
  collapse?: boolean
  /** 点击触发的回调 */
  onClick?: () => void
}

const Hamburger: React.FC<IHamburgerProps> = props => {
  const {onClick, collapse} = props
  const [innerCollapse, setInnerCollapse] = useState(collapse)

  const icon = innerCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'

  const handleClick = () => {
    setInnerCollapse(c => !c)
    onClick && onClick()
  }

  return (
    <div className="hamburger-container" onClick={handleClick}>
      {<Icon icon={icon} />}
    </div>
  )
}

Hamburger.defaultProps = {
  collapse: false,
}

export default memo(Hamburger)
