import {Language} from './store/reducers/app'

/** 菜单折叠按钮显示位置 */
export enum CollapsedMenuBtnPosition {
  hide = 'hide',
  top = 'top',
  bottom = 'bottom',
}

export interface DefaultSettings {
  iconfontUrl: string
  showLogo: boolean
  fixHeader: boolean
  fixSidebar: boolean
  openTagsView: boolean
  showSidebar: boolean
  showBreadcrumb: boolean
  sidebarCollapsed: boolean
  title: string
  collapsedMenuBtnPosition: CollapsedMenuBtnPosition
  lang: Language
  weekMode: boolean
  grayMode: boolean
}

const defaultSettings: DefaultSettings = {
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '',

  // 是否显示侧边Logo
  showLogo: true,

  // 是否固定header
  fixHeader: false,

  // 是否固定sidebar
  fixSidebar: true,

  // 是否开启tags-view
  openTagsView: true,

  // 是否显示侧边栏
  showSidebar: true,

  // 是否显示面包屑导航
  showBreadcrumb: true,

  // 侧边栏是否折叠
  sidebarCollapsed: false,

  // 菜单折叠按钮显示位置
  collapsedMenuBtnPosition: CollapsedMenuBtnPosition.top,

  // 色弱模式
  weekMode: false,

  // 灰度模式
  grayMode: false,

  // 页面title
  title: 'React-Ts-Antd-Pro',

  // 系统默认语言
  lang: 'zh',
}

export default defaultSettings
