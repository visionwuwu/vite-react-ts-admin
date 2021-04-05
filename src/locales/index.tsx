import React from 'react'
import Cookies from 'js-cookie'
import {IntlProvider} from 'react-intl'
import {ConfigProvider} from 'antd'
import {Language} from 'store/reducers/app'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'
import id_ID from './lang//id_ID'
import moment from 'moment'
// import 'moment/locale/zh-cn'
// import 'moment/locale/id'

/** 默认语言 */
export const defaultLang = 'zh' || navigator.language.split('-')[0]

/** 存储在cookie中locale的键 */
export const LOCALE_KEY = 'LOCALE'

/** 获取cookie中的locale */
export function getLocale() {
  return Cookies.get(LOCALE_KEY) as Language
}

/** 设置locale */
export function setLocale(locale: Language) {
  return Cookies.set(LOCALE_KEY, locale) as Language
}

/** 删除locale */
export function removeLocale(): void {
  Cookies.remove(LOCALE_KEY)
}

/** 自定义的国际化语言翻译 */
const localeMessages: any = {
  en: en_US,
  zh: zh_CN,
  id: id_ID,
}

/** 封装的国际化组件属性定义 */
export interface IIntlProProps {
  locale: Language
  children: React.ReactNode
}

class IntlPro extends React.Component<IIntlProProps> {
  static defaultProps = {
    locale: defaultLang,
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    const {children, locale} = this.props
    const currLocale = getLocale() || locale
    const {antdLocale, momentName, momentLocale, ...message} = localeMessages[
      currLocale
    ]

    moment.updateLocale(momentName, momentLocale)

    return (
      <IntlProvider
        key={currLocale}
        defaultLocale={currLocale}
        locale={currLocale}
        messages={message}
      >
        <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
      </IntlProvider>
    )
  }
}

export default IntlPro
