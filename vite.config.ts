import {UserConfigExport, ConfigEnv} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
// import usePluginImport from 'vite-plugin-importer'
import {viteMockServe} from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({command}: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
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
          modifyVars: {
            '@primary-color': '#0960BD',
          },
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
      // usePluginImport({
      //   libraryName: 'antd',
      //   libraryDirectory: 'es',
      //   style: true
      // })
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
