import React from 'react'
import {SettingOutlined} from '@ant-design/icons'
import {Tooltip} from 'antd'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {showRightPanelToggle} from 'store/actions'
import './index.less'

interface ISettingProps {}

const Setting: React.FC<ISettingProps & IProps> = props => {
  const {showRightPanelToggle} = props

  return (
    <div className="setting-container">
      <Tooltip placement="bottom" title="系统设置">
        <SettingOutlined onClick={showRightPanelToggle} />
      </Tooltip>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showRightPanelToggle() {
    dispatch(showRightPanelToggle())
  },
})

type IProps = ReturnType<typeof mapDispatchToProps>

export default connect(null, mapDispatchToProps)(React.memo(Setting))
