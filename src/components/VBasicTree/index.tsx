import React, {ChangeEventHandler, useMemo, useState} from 'react'
import {Dropdown, Input, Tree, Menu, TreeProps, Empty} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import Scrollbars from 'react-custom-scrollbars'
import classnames from 'classnames'
import {Key, DataNode} from 'rc-tree/lib/interface'
import {MenuClickEventHandler} from 'rc-menu/lib/interface'
import {getExpandeKeysInDataListByValue, generateList} from './utils'
import './index.less'

/** 基础树形控件外部传递属性 */
export interface IVBasicTreeProps extends Omit<TreeProps, 'treeData'> {
  style?: React.CSSProperties
  className?: string
  title?: string
  showSearch?: boolean
  showTitle?: boolean
  treeData: DataNode[]
}

const VBasicTree: React.FC<IVBasicTreeProps> = props => {
  /** 解构组件的props */
  const {
    className,
    style,
    title,
    showTitle,
    showSearch,
    treeData,
    ...restProps
  } = props

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  /** 自定义Css class */
  const classes = classnames('vbasic-tree bg-white', className)

  /** 扁平化数据 */
  const flattenData: any[] = []

  /** 转化数据，将树形数据扁平化 */
  generateList(treeData, flattenData)

  /** 模糊搜索树中的子节点 */
  const handleSearch: ChangeEventHandler<any> = e => {
    const {value} = e.target
    // 获取展开的keys数组
    const expandedKeys = getExpandeKeysInDataListByValue(
      value,
      flattenData,
      treeData,
    )
    setExpandedKeys(expandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  /** 展开/收起节点时触发 */
  const handleExpand = (expandedKeys: Key[]) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  //收起全部
  const handleExpandClose: MenuClickEventHandler = () => {
    setExpandedKeys([])
  }

  /** 递归获取所有节点key */
  const deepTraversa = (node: any, nodeList: any[] = []) => {
    if (node !== null) {
      nodeList.push(node.key)
      const children = node.children
      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          deepTraversa(children[i], nodeList)
        }
      }
    }
    return nodeList
  }

  //展开全部
  const handleExpandAll: MenuClickEventHandler = () => {
    const expandKeys: any[] = []
    treeData &&
      treeData.forEach(item => {
        expandKeys.push(deepTraversa(item))
      })
    setExpandedKeys(expandKeys.flat())
  }

  // 递归生成树形结构数据
  const generatorTreeData = (treeData: DataNode[]) => {
    return treeData.reduce((prev: any, next: any) => {
      const index = next.title.indexOf(searchValue)
      const beforeStr = next.title.substr(0, index)
      const afterStr = next.title.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{next.title}</span>
        )
      if (index > -1) {
        const item: any = {...next, title, key: next.key}
        if (next.children && next.children.length !== 0) {
          const children = generatorTreeData(next.children)
          if (children && children.length > 0) {
            item.children = children
          }
        }
        prev = prev.concat(item)
      } else if (next.children && next.children.length !== 0) {
        const children = generatorTreeData(next.children)
        if (children && children.length > 0) {
          const item = {...next, title, key: next.key, children}
          prev = prev.concat(item)
        }
      }
      return prev
    }, [])
  }

  // 渲染自定义树形组件标题
  const renderTreeTitle = useMemo(() => {
    if (title && showTitle) {
      return <span className="vbasic-tree-title">{title}</span>
    }
    return null
  }, [title, showTitle])

  /** 展开/收缩 全部节点下拉菜单 */
  const overlay = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="expend-all" onClick={handleExpandAll}>
          展开全部
        </Menu.Item>
        <Menu.Item key="collapse-all" onClick={handleExpandClose}>
          收缩全部
        </Menu.Item>
      </Menu>
    )
  }, [handleExpandAll, handleExpandClose])

  // 渲染搜索框
  const renderTreeSearchInput = useMemo(() => {
    if (!showSearch) return null
    return (
      <Input
        size="small"
        type="search"
        placeholder="搜索"
        className="mr-1 w-2/3"
        onChange={handleSearch}
      />
    )
  }, [handleSearch])

  return (
    <div className={classes} style={style}>
      <div className="vbasic-tree-header d-flex border-b-1 py-1.5 px-2 align-items-center">
        {/* 标题 */}
        {renderTreeTitle}
        {/* 搜索输入框 */}
        <div className="flex-1 d-flex align-items-center justify-content-end">
          {renderTreeSearchInput}
          <Dropdown overlay={overlay} placement="bottomLeft">
            <MoreOutlined style={{cursor: 'pointer'}} />
          </Dropdown>
        </div>
      </div>
      <div
        className="vbasic-tree-body"
        style={{height: 'calc(100% - 38px)', padding: '6px 0'}}
      >
        {/* 树形控件 */}
        <Scrollbars autoHide style={{height: '100%'}}>
          {treeData.length !== 0 ? (
            <Tree
              treeData={generatorTreeData(treeData)}
              onExpand={handleExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              {...restProps}
            />
          ) : (
            <Empty />
          )}
          {treeData.length !== 0 ? (
            searchValue.length > 0 && expandedKeys.length === 0 ? (
              <Empty />
            ) : null
          ) : null}
        </Scrollbars>
      </div>
    </div>
  )
}

VBasicTree.defaultProps = {
  showSearch: true,
  showTitle: true,
}

export default VBasicTree
