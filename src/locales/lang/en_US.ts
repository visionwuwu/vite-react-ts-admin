import antdEnUS from 'antd/lib/locale/en_US'
// @ts-ignore
import momentEU from 'moment/locale/eu'

const components = {
  antdLocale: antdEnUS,
  momentName: 'en',
  momentLocale: momentEU,
}

export default {
  hello: 'hello world',
  ...components,
}
