import React, {memo} from 'react'
import './index.less'

interface IPageBoxProps {
  style?: React.CSSProperties
  className?: string
}

const PageBox: React.FC<IPageBoxProps> = () => {
  return <div className="app-container"></div>
}

export default memo(PageBox)
