import React from 'react'
import {Breadcrumb} from 'antd'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import menuConfig, {MenuConfig} from '@/config/menuConfig'
import './index.less'

type IBreadcrumbProps = RouteComponentProps

export const matchRoutes = (routes: MenuConfig[], pathname: string) => {
  const temppath: MenuConfig[] = []
  try {
    // eslint-disable-next-line
    function getItemPath(item: MenuConfig) {
      const isMatch = pathname.indexOf(item.path) !== -1
      if (isMatch) {
        temppath.push(item)
      }
      if (item.path === pathname) {
        throw new Error('GOT IT!')
      }
      if (isMatch && item.children && item.children.length > 0) {
        for (let i = 0; i < item.children.length; i++) {
          getItemPath(item.children[i])
        }
      }
    }
    for (let i = 0; i < routes.length; i++) {
      getItemPath(routes[i])
    }
  } catch (error) {
    return temppath
  }
}

const BreadcrumbContainer: React.FC<IBreadcrumbProps> = props => {
  const {location} = props

  let paths = matchRoutes(menuConfig, location.pathname)

  const first = paths && paths[0]

  if (first && first.title.trim() !== '首页') {
    if (paths) {
      paths = [{path: '/dashboard', title: '首页'}].concat(paths)
    }
  }

  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        {paths &&
          paths.map(item => {
            const isHome = item.title === '首页'
            const type = isHome ? 'a' : 'span'
            const props = isHome ? {href: item.path} : null
            return (
              <Breadcrumb.Item key={item.path}>
                {React.createElement(type, props, item.title)}
              </Breadcrumb.Item>
            )
          })}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(BreadcrumbContainer)
