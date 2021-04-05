import {UserConfigExport, ConfigEnv} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
import {viteMockServe} from 'vite-plugin-mock'
import config, {EnvName} from './config'
import lessToJS from 'less-vars-to-js'
import fs from 'fs'

/** 获取环境变量 */
const env: EnvName =
  (process.argv[process.argv.length - 1] as EnvName) || 'development'

/** 当前环境基础配置 */
const base = config[env]

/** 自定义antd主题 */
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './config/antd-variables.less'),
    'utf8',
  ),
)

// https://vitejs.dev/config/
export default ({command}: ConfigEnv): UserConfigExport => {
  return {
    base: base ? base.cdn : './',
    resolve: {
      alias: {
        root: path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
        views: path.resolve(__dirname, './src/views'),
        store: path.resolve(__dirname, './src/store'),
        utils: path.resolve(__dirname, './src/utils'),
        hooks: path.resolve(__dirname, './src/hooks'),
        assets: path.resolve(__dirname, './src/assets'),
        styles: path.resolve(__dirname, './src/styles'),
        apis: path.resolve(__dirname, './src/api'),
        comps: path.resolve(__dirname, './src/components'),
        mock: path.resolve(__dirname, './mock'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: themeVariables,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      reactRefresh(),
      viteMockServe({
        supportTs: true,
        localEnabled: command === 'serve',
      }),
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: name => {
              return `antd/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
  }
}
