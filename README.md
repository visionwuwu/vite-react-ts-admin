<div align="center"> <a href="https://github.com/visionwuwu/vite-react-ts-admin"> <img alt="Visionwuwu Logo" width="200" height="200" src="http://nestjs.cms.visionwu.top/uploads/images/logo.png"> </a> <br> <br>

<h1>橙晨燕</h1>
</div>

## 简介

橙晨燕 是一个免费开源的后台管理系统模板。使用了最新的`React17`,`vite2`,`TypeScript`等主流技术开发，项目中全部使用函数式组件和 hooks api 进行开发，可用于学习合参考。

## 特性

- **最新技术栈**：使用 React17/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **国际化**：内置完善的国际化方案
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 预览

- [橙晨燕](http://nestjs.cms.visionwu.top)

测试账号: admin/123456

## 系统页面截图预览

<p align="center">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/login.jpeg">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/home.jpeg">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/account.jpeg">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/role.jpeg">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/menu.jpeg">
    <img alt="橙晨燕" width="100%" src="http://nestjs.cms.visionwu.top/uploads/ui-admin/department.jpeg">
</p>

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [React17.0](https://react.docschina.org/) - 熟悉 React 基础语法 Hook Api 使用
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Ant-Design](https://ant.design/components/overview-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/visionwuwu/vite-react-ts-admin.git
```

- 安装依赖

```bash
cd vite-react-ts-admin

npm install

```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build:production
```

## 功能特性

:hammer: 开发规范

- Eslint 校验及错误提示
- Prettier 统一代码风格
- Typescript 语法支持
- Git Hooks 提交代码时校验

:huammer: 基本功能

- 权限验证（基于角色）
- react 路由封装，动态路由实现
- redux 全局状态管理设计与封装
- 通用 hooks 封装
- axios 请求封装
- vite 开发代理
- vite 本地模拟数据
- antd 按需导入，定制主题
- react-intl 国际化多语言
- 动态侧边栏（支持多级路由嵌套）
- 动态面包屑
- 快捷导航（标签栏）
- Screenfull 全屏
- 自适应收缩侧边栏
- 系统设置（固定 Sidebar、Header...）
- 支持响应式（移动端展示良好）
- 多环境打包
- jest 单元测试

:huammer: 业务功能

- 登录 管理员登录
- 用户管理 用户是系统操作者，该功能主要完成系统用户配置。
- 角色管理：角色菜单权限分配、设置角色按部门进行数据范围权限划分。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
- 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。

:huammer: 组件相关

- 二次封装 antd 表格组件
- 二次封装 antd 表单组件
- 二次封装 antd 全局弹框组件
- 表单抽屉组件

## 目录结构

```
├── config                     # 构建配置相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 菜单路由配置
│   ├── hooks                  # 全局 hooks
│   ├── locales                # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.tsx                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── defaultSetting.js      # 系统默认配置文件
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .eslintignore              # eslint 忽略检查的文件或文件夹
├── .prettierrc.js             # prettier 配置项
├── .prettierignore            # prettierignore 忽略检查的文件或文件夹
├── .travis.yml                # 自动化CI配置
├── babel.config.js            # babel-loader 配置
├── index.html                 # html模板
├── jest.config.js             # jest 配置
├── tsconfig.json              # typescritp 配置
├── vite.config.js             # vue-cli 配置
└── package.json               # package.json
```

## 项目地址

- [vite-react-ts-admin](https://github.com/visionwuwu/vite-react-ts-admin)

## 后台整合示例

- [lamp-cloud](https://github.com/zuihou/lamp-cloud) - 基于 SpringCloud Alibaba 的微服务中后台快速开发平台

## 维护者

[@Visionwuwu](https://github.com/visionwuwu)

## License

[MIT © Visionwuwu2021](./LICENSE)
