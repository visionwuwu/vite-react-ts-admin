import React, {MouseEvent} from 'react'
import VBasicTableTitle from '../VBasicTableTitle'
import VBasicTableToolbar from '../VBasicTableToolbar'
import './index.less'

interface IVBasicTableHeaderProps {
  title: string
  addBtnText: string
  addBtnClick(e: MouseEvent): void
}

const VBasicTableHeader: React.FC<IVBasicTableHeaderProps> = props => {
  const {title, addBtnText, addBtnClick} = props

  return (
    <div className="vbasic-table-header">
      <VBasicTableTitle title={title} />

      <VBasicTableToolbar addBtnClick={addBtnClick} addBtnText={addBtnText} />
    </div>
  )
}

export default React.memo(VBasicTableHeader)
