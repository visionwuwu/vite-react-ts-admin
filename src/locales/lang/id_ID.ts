import antdIdID from 'antd/lib/locale/id_ID'
// @ts-ignore
import momentID from 'moment/locale/id'

const components = {
  antdLocale: antdIdID,
  momentName: 'id',
  momentLocale: momentID,
}

export default {
  hello: 'Selamat datang di Genie',
  ...components,
}
