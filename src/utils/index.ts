import {MenuListProps} from '@/config/menuConfig'

/**
 * 通过属性在menuList获取对应的menuItem
 * @param menuList
 * @param key
 * @param value
 * @returns
 */
export const getMenuItemInMenuListByProperty = (
  menuList: MenuListProps[],
  key: string,
  value: string,
): MenuListProps | null => {
  let stack: MenuListProps[] = []
  stack = menuList.concat(stack)
  let res: MenuListProps | null = null
  while (stack.length) {
    const cur = stack.shift() as MenuListProps
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack)
    }
    if (cur[key] === value) {
      res = cur
      break
    }
  }
  return res
}

interface DebouncedProps {
  (args?: any[]): any
  cancel(): any
}

/**
 * 防抖函数
 * @param timer
 * @param doSome
 * @param immediate
 * @returns
 */
export function debounce(
  timer: number,
  doSome: (...args: any[]) => any,
  immediate = false,
): DebouncedProps {
  let timeid: any, res: any
  const debounced: DebouncedProps = <DebouncedProps>(
    function (this: any, ...args: any[]) {
      // 先清除定时器
      window.clearTimeout(timeid)
      // 是否立即执行
      if (immediate) {
        const callNow = !timeid
        timeid = setTimeout(() => {
          timeid = null
        }, timer)
        if (callNow) res = doSome.apply(this, args)
      } else {
        // 开启定时器
        timeid = setTimeout(() => {
          // 绑定当前上下文this,形参
          doSome.apply(this, args)
        }, timer)
      }
      return res
    }
  )
  debounced.cancel = () => {
    window.clearTimeout(timeid)
    timeid = null
  }
  return debounced
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(
  data: any[],
  id = 'id',
  pid = 'parentId',
  addFields?: {[name: string]: any},
) {
  const res = []
  const temp: any = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (typeof addFields === 'object') {
        Object.keys(addFields).forEach(key => {
          data[k][key] = data[k][addFields[key]]
        })
      }
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      if (typeof addFields === 'object') {
        Object.keys(addFields).forEach(key => {
          data[k][key] = data[k][addFields[key]]
        })
      }
      res.push(data[k])
    }
  }
  return res
}

/**
 * rgba转十六进制
 * @param color
 * @returns
 */
export function hexify(color: any) {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')
  const a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  )
}
