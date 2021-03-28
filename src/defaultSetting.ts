export interface DefaultSettings {
  iconfontUrl: string
  showLogo: boolean
  fixHeader: boolean
  openTagsView: boolean
  title: string
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

  // 是否开启tags-view
  openTagsView: true,

  // 页面title
  title: 'React-Ts-Antd-Pro',
}

export default defaultSettings
