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
  AccountCenter,
  AccountSetting,
  TableCom,
  FormCom,
} from '../views'
export type RoleName = 'admin' | 'editor' | 'guest'
export interface routeProps {
  path: string
  name?: string
  noExtra?: boolean
  // eslint-disable-next-line
  component: React.LazyExoticComponent<any>
  roles?: Array<RoleName>
  notAuth?: boolean
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
    notAuth: true,
  },
  {
    path: '/doc',
    name: 'Doc',
    component: Doc,
    notAuth: true,
  },
  {
    path: '/permission/explanation',
    name: 'Explanation',
    component: Explanation,
    notAuth: true,
  },
  {
    path: '/permission/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/permission/editor',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/permission/guest',
    name: 'Guest',
    component: Guest,
  },
  {
    path: '/system/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/system/role',
    name: 'Role',
    component: Role,
  },
  {
    path: '/system/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/system/dept',
    name: 'Department',
    component: Department,
  },
  {
    path: '/system/changePassword',
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    path: '/component/table',
    name: 'TableCom',
    component: TableCom,
  },
  {
    path: '/component/form',
    name: 'FormCom',
    component: FormCom,
  },
  {
    path: '/nested/menu1/menu1-1',
    name: 'Menu1_1',
    component: Menu1_1,
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    name: 'Menu1_2_1',
    component: Menu1_2_1,
  },
  {
    path: '/account/center',
    name: 'AccountCenter',
    component: AccountCenter,
    notAuth: true,
  },
  {
    path: '/account/setting',
    name: 'AccountSetting',
    component: AccountSetting,
    notAuth: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    notAuth: true,
  },
  {
    path: '/error/404',
    name: '404',
    component: NotFound,
    notAuth: true,
  },
]

export default routes
