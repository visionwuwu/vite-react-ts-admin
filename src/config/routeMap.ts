import {
  Login,
  Dashboard,
  Doc,
  About,
  Explanation,
  Editor,
  Admin,
  Guest,
  Account,
  Role,
  Menu,
  ChangePassword,
  Department,
  Menu1_2_1,
  Menu1_1,
  NotFound,
} from '../views'
export type RoleName = 'admin' | 'editor' | 'guest'
export interface routeProps {
  path: string
  name?: string
  noExtra?: boolean
  // eslint-disable-next-line
  component: React.LazyExoticComponent<any>
  roles?: Array<RoleName>
  requiredAuth?: boolean
}

/**
 * 全局路由，无需嵌套sidebar，header
 */
export const globalRoutes: Array<routeProps> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const routes: Array<routeProps> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/doc',
    name: 'Doc',
    component: Doc,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/permission/explanation',
    name: 'Explanation',
    component: Explanation,
    roles: ['admin', 'editor'],
  },
  {
    path: '/permission/admin',
    name: 'Admin',
    component: Admin,
    roles: ['admin'],
  },
  {
    path: '/permission/editor',
    name: 'Editor',
    component: Editor,
    roles: ['admin', 'editor'],
  },
  {
    path: '/permission/guest',
    name: 'Guest',
    component: Guest,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/system/account',
    name: 'Account',
    component: Account,
    roles: ['admin', 'editor'],
  },
  {
    path: '/system/role',
    name: 'Role',
    component: Role,
    roles: ['admin', 'editor'],
  },
  {
    path: '/system/menu',
    name: 'Menu',
    component: Menu,
    roles: ['admin', 'editor'],
  },
  {
    path: '/system/dept',
    name: 'Department',
    component: Department,
    roles: ['admin', 'editor'],
  },
  {
    path: '/system/changePassword',
    name: 'ChangePassword',
    component: ChangePassword,
    roles: ['admin', 'editor'],
  },
  {
    path: '/nested/menu1/menu1-1',
    name: 'Menu1_1',
    component: Menu1_1,
    roles: ['admin', 'editor'],
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    name: 'Menu1_2_1',
    component: Menu1_2_1,
    roles: ['admin', 'editor'],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/error/404',
    name: '404',
    component: NotFound,
    roles: ['admin', 'editor', 'guest'],
  },
]

export default routes
