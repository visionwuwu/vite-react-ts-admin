import React, {memo} from 'react'
import Icon from 'comps/Icon'
import {Tooltip} from 'antd'
import {showRightPanelToggle} from 'store/actions'
import {useAppDispatch} from 'root/src/store'
import variables from 'styles/variables.module.less'

interface ISettingProps {}

const Setting: React.FC<ISettingProps> = () => {
  const dispatch = useAppDispatch()
  const action = () => {
    dispatch(showRightPanelToggle())
  }

  return (
    <Tooltip placement="left" title="系统设置">
      <div className="setting-container">
        <Icon
          icon="SettingOutlined"
          color={variables['primary-color']}
          size={16}
          onClick={action}
        />
      </div>
    </Tooltip>
  )
}

export default memo(Setting)
