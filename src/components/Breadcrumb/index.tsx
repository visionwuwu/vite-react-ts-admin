import React, {memo} from 'react'
import {Breadcrumb, Grid} from 'antd'
import {useLocation} from 'react-router-dom'
import menuConfig, {MenuConfig} from '@/config/menuConfig'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
const {useBreakpoint} = Grid
import './index.less'

interface IBreadcrumbProps {}

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

const BreadcrumbContainer: React.FC<IBreadcrumbProps> = () => {
  const location = useLocation()
  const screens = useBreakpoint()

  const classes = classnames('breadcrumb-container', {
    'is-visible': !screens.lg,
  })

  let paths = matchRoutes(menuConfig, location.pathname)

  const first = paths && paths[0]

  if (first && first.title.trim() !== '首页') {
    if (paths) {
      paths = [{path: '/dashboard', title: '首页'}].concat(paths)
    }
  }

  return (
    <div className={classes}>
      <Breadcrumb>
        <TransitionGroup>
          {paths &&
            paths.map(item => {
              const isHome = item.title === '首页'
              const type = isHome ? 'a' : 'span'
              const props = isHome ? {href: item.path} : null
              return (
                <CSSTransition
                  key={item.path}
                  timeout={500}
                  classNames="fadeInLeft"
                  exit={false}
                >
                  <Breadcrumb.Item key={item.path}>
                    {React.createElement(type, props, item.title)}
                  </Breadcrumb.Item>
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      </Breadcrumb>
    </div>
  )
}

export default memo(BreadcrumbContainer)
