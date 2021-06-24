import React, {
  MouseEvent,
  useReducer,
  Dispatch,
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import {Table} from 'antd'
import {SizeType} from 'antd/lib/config-provider/SizeContext'
import VBasicTableHeader from './components/VBasicTableHeader'
import {
  RenderExpandIcon,
  ExpandableConfig,
  RowClassName,
} from 'rc-table/lib/interface'
import {TablePaginationConfig} from 'antd/lib/table/interface'
import classnames from 'classnames'
import useTableScrollY from './hooks/useTableScrollY'
import VBasicForm from '../vBasicForm'
import {IFormItemProps} from '../vBasicForm/components/FromItem'
import {defaultPagination} from './default'
import Icon from 'comps/Icon'
import './index.less'

interface IVBasicTableProps {
  dataSource: any[]
  columns: any[]
  className?: string
  style?: React.CSSProperties
  title?: string
  addBtnText?: string
  addBtnClick?(e: MouseEvent): void
  othersNodeHeight?: number
  formItems: IFormItemProps[]
  onFinish?: (values: any) => void
  onReset?: () => void
  loading?: boolean
  onRefresh?(): void
  size?: SizeType
  rowKey?: string
  pagination?: TablePaginationConfig | boolean
}

/** 表格尺寸大小 */
interface SizeAction {
  type: 'updateSize'
  value: SizeType
}

/** 工具条actions */
type ToolbarActions = SizeAction

interface ToolbarState {
  onRefresh: (() => void) | undefined
  size: SizeType
  dispatch: Dispatch<ToolbarActions> | undefined
}

const initState = (state?: ToolbarState): ToolbarState => {
  return {
    onRefresh: undefined,
    size: 'small',
    dispatch: undefined,
    ...state,
  }
}

const reducer = (state: ToolbarState, action: ToolbarActions): ToolbarState => {
  switch (action.type) {
    case 'updateSize':
      return {
        ...state,
        size: action.value,
      }
    default:
      return state
  }
}

export const ToolbarContext = createContext<ToolbarState>(initState())

const VBasicTable: React.FC<IVBasicTableProps> = props => {
  /** 解构组件的props */
  const {
    dataSource,
    columns,
    className,
    style,
    title,
    addBtnText,
    addBtnClick,
    othersNodeHeight,
    onFinish,
    formItems,
    loading,
    onRefresh,
    size,
    pagination,
    rowKey,
    onReset,
  } = props

  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([])

  const innerPagination = useMemo<any>(() => {
    return typeof pagination === 'boolean'
      ? pagination
      : {
          ...defaultPagination,
          ...pagination,
        }
  }, [pagination])

  const classes = useMemo(() => {
    return classnames('vbasic-table-wrapper', className)
  }, [className])

  const withoutTableBodyHeightEnum: {
    [propName: string]: number
  } = useMemo(() => {
    return {
      large: 202,
      middle: 178,
      small: 162,
    }
  }, [])

  useEffect(() => {
    const keyArr: any[] = []
    if (dataSource) {
      dataSource.map(item => {
        // 这里就可以把要展开的key加进来记住必须是唯一的
        keyArr.push(item.key)
      })
      setExpandedRowKeys(keyArr)
    }
  }, [])

  const [state, dispatch] = useReducer(
    reducer,
    initState({
      size,
      onRefresh,
      dispatch: undefined,
    }),
  )

  const height =
    (othersNodeHeight as number) +
    withoutTableBodyHeightEnum[state.size as string]

  const scrollY = useTableScrollY(height, size)

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
          <Icon
            icon="DownOutlined"
            className="mr-2"
            onClick={e => onExpand(record, e)}
          />
        )
      } else {
        return (
          <Icon
            icon="RightOutlined"
            className="mr-2"
            onClick={e => onExpand(record, e)}
          />
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

  const classNameFn: RowClassName<any> = useCallback((record, index) => {
    let className = 'rowHover'
    className = classnames(className, {
      rowBgColor: index % 2 !== 0,
    })
    return className
  }, [])

  const renderTableHeader = () => {
    return (
      <ToolbarContext.Provider value={{...state, dispatch}}>
        <VBasicTableHeader
          title={title as string}
          addBtnText={addBtnText as string}
          addBtnClick={addBtnClick as any}
        />
      </ToolbarContext.Provider>
    )
  }

  return (
    <div className={classes} style={style}>
      <VBasicForm
        onFinish={onFinish as any}
        onReset={onReset as any}
        formItems={formItems}
        loading={loading}
      />
      <Table
        className="vbasic-table"
        dataSource={dataSource}
        size={state.size}
        bordered
        rowKey={rowKey}
        loading={loading}
        scroll={{x: 900}}
        title={() => renderTableHeader()}
        rowClassName={classNameFn}
        expandable={expandable}
        pagination={innerPagination}
      >
        {columns.map((column, index) => {
          return <Table.Column {...column} key={index} />
        })}
      </Table>
    </div>
  )
}

VBasicTable.defaultProps = {
  title: '',
  addBtnText: '',
  className: '',
  size: 'middle',
  rowKey: 'key',
  othersNodeHeight: 0,
  // eslint-disable-next-line
  addBtnClick: (e: MouseEvent) => {},
}

export default React.memo(VBasicTable)
