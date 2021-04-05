import antdZhCN from 'antd/lib/locale/zh_CN'
// @ts-ignore
import momentCN from 'moment/locale/zh-cn'

export const components = {
  antdLocale: antdZhCN,
  momentName: 'zh-cn',
  momentLocale: momentCN,
}

export default {
  hello: '你好',
  ...components,
}
