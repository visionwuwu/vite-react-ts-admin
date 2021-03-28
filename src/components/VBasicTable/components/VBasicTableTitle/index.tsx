import React from 'react'
import './index.less'

interface IVBasicTableTitleProps {
  title: string
}

const VBasicTableTitle: React.FC<IVBasicTableTitleProps> = props => {
  return <div className="vbasic-table-title">{props.title}</div>
}

export default React.memo(VBasicTableTitle)
