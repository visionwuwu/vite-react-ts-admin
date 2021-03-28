import {DataNode} from 'rc-tree/lib/interface'
/**
 * 生成一个扁平化数据
 * @param treeData
 * @param dataList
 */
export const generateList = (treeData: DataNode[], dataList: any[] = []) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i]
    const {key, title} = node
    dataList.push({...node, key, title})
    if (node.children) {
      generateList(node.children, dataList)
    }
  }
}

/**
 * 通过key在树中查找对应的节点的父节点的key
 * @param key
 * @param tree
 * @returns
 */
export const getParentKey = (key: string, tree: any[]): any => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item: any) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

/**
 * 根据输入的值获取要展开的keys
 * @param value 搜索框字符串
 * @param dataList 扁平化的treeData
 * @param treeData tree组件所需树形数据
 */
export const getExpandeKeysInDataListByValue = (
  value: any,
  dataList: any[],
  treeData: DataNode[],
) => {
  return dataList
    .map(item => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, treeData)
      }
      return null
    })
    .filter((item, i, self) => item && self.indexOf(item) === i)
}
