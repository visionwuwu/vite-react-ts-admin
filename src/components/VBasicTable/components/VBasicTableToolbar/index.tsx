import React, {MouseEvent, useContext} from 'react'
import {Button, Divider, Tooltip, Dropdown, Menu} from 'antd'
import {
  RedoOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {ToolbarContext} from '../../index'
import './index.less'

interface IVBasicTableToolbarProps {
  addBtnText: string
  addBtnClick(e: MouseEvent): void
}

const VBasicTableToolbar: React.FC<IVBasicTableToolbarProps> = props => {
  const {addBtnText, addBtnClick} = props

  const {size, onRefresh, dispatch} = useContext(ToolbarContext)

  const dispatchSize = (key: 'large' | 'middle' | 'small') => {
    switch (key) {
      case 'large':
        dispatch && dispatch({type: 'updateSize', value: 'large'})
        break
      case 'middle':
        dispatch && dispatch({type: 'updateSize', value: 'middle'})
        break
      case 'small':
        dispatch && dispatch({type: 'updateSize', value: 'small'})
        break
      default:
        break
    }
  }

  const SizeOverlay = (
    <Menu defaultValue={size}>
      <Menu.Item
        key="default"
        onClick={() => {
          dispatchSize('large')
        }}
      >
        默认
      </Menu.Item>
      <Menu.Item
        key="middle"
        onClick={() => {
          dispatchSize('middle')
        }}
      >
        中等
      </Menu.Item>
      <Menu.Item
        key="small"
        onClick={() => {
          dispatchSize('small')
        }}
      >
        紧凑
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="vbasic-table-toolbar">
      <Button
        type="primary"
        size="middle"
        onClick={(e: MouseEvent) => addBtnClick(e)}
      >
        {addBtnText}
      </Button>

      <Divider type="vertical" />

      <Tooltip placement="top" title="刷新">
        <RedoOutlined onClick={onRefresh} />
      </Tooltip>

      <Tooltip placement="top" title="密度">
        <Dropdown
          overlay={SizeOverlay}
          placement="bottomCenter"
          trigger={['click']}
        >
          <ColumnHeightOutlined />
        </Dropdown>
      </Tooltip>

      <Tooltip title="列设置" placement="top">
        <SettingOutlined />
      </Tooltip>
    </div>
  )
}

export default React.memo(VBasicTableToolbar)
