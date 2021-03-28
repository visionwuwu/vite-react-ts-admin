const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)
/** 判断是否是图片链接 */
export const isImg = (path: string) => {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path)
}

const objPtoToString = Object.prototype.toString

export function isPromise(val: any): val is Promise<any> {
  return objPtoToString.call(val) === '[object Promise]'
}

export function isDate(val: any): val is Date {
  return objPtoToString.call(val) === '[object Date]'
}
// eslint-disable-next-line
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
// eslint-disable-next-line
export function isPlainObject(val: any): val is Object {
  return objPtoToString.call(val) === '[object Object]'
}

export function isElement(val: any): val is Element {
  return val instanceof Element
}

/**
 * 深拷贝工具函数
 * @param objs
 * @returns
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 第二次遍历时发现仍让是一个普通的object，而且存在result中那么就是合并这俩个对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            // 第一次就是深拷贝这个对象，并赋值
            result[key] = deepMerge({}, val)
          }
        } else {
          // 第一就是普通赋值，第二次这个属性如果不存在就赋值存在覆盖
          result[key] = val
        }
      })
    }
  })

  return result
}
