import React, {useState, useEffect, memo} from 'react'
import {Table, TableProps} from 'antd'
import {
  RenderExpandIcon,
  ExpandableConfig,
  RowClassName,
} from 'rc-table/lib/interface'
import {RightOutlined, DownOutlined} from '@ant-design/icons'
import classnames from 'classnames'

type ITreeTableProps = TableProps<any>

const TreeTable: React.FC<ITreeTableProps> = props => {
  const {dataSource, columns} = props

  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([])

  useEffect(() => {
    const keyArr: any[] = []
    if (dataSource) {
      dataSource.map(item => {
        //这里就可以把要展开的key加进来记住必须是唯一的
        keyArr.push(item.key)
      })
    }
    setExpandedRowKeys(keyArr)
  }, [])

  const onExpand = (expanded: any, record: any) => {
    //expanded是否展开  record每一项的值
    const keys = expandedRowKeys
    if (expanded) {
      const arr = keys
      arr.push(record.key)
      setExpandedRowKeys(arr)
    } else {
      let arr2 = []
      if (keys.length > 0 && record.key) {
        arr2 = keys.filter(key => {
          return key !== record.key
        })
      }
      setExpandedRowKeys(arr2)
    }
  }

  const expandedIcon: RenderExpandIcon<any> = ({
    expanded,
    onExpand,
    record,
  }) => {
    //expanded-是否可展开, onExpand-展开事件默认, record-每一项的值 设置自定义图标
    if (record.children && record.children.length != 0) {
      if (expanded) {
        //根据是否可以展开判断
        return (
          <DownOutlined className="mr-2" onClick={e => onExpand(record, e)} />
        )
      } else {
        return (
          <RightOutlined className="mr-2" onClick={e => onExpand(record, e)} />
        )
      }
    } else {
      return ''
    }
  }

  const expandable: ExpandableConfig<any> = {
    expandIcon: expandedIcon,
    expandedRowKeys: expandedRowKeys,
    onExpand: onExpand,
  }

  console.log(classnames('1'))

  const classNameFn: RowClassName<any> = (record, index) => {
    let className = 'rowHover'
    if (record && record.leve === 1) {
      className = classnames(className, {
        rowBgColor: index % 2 !== 0,
      })
    }
    return className
  }

  return (
    <div className="app-container">
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={expandable}
        rowClassName={classNameFn}
      />
    </div>
  )
}

export default memo(TreeTable)
