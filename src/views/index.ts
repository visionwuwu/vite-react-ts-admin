import {lazy} from 'react'

const About = lazy(() => import('./about'))
const Login = lazy(() => import('./login'))
const Dashboard = lazy(() => import('./dashboard'))
const Doc = lazy(() => import('./doc'))
const Explanation = lazy(() => import('./permission'))
const Admin = lazy(() => import('./permission/admin'))
const Editor = lazy(() => import('./permission/editor'))
const Guest = lazy(() => import('./permission/guest'))
const Account = lazy(() => import('./system/account'))
const Role = lazy(() => import('./system/role'))
const Menu = lazy(() => import('./system/menu'))
const Department = lazy(() => import('./system/department'))
const ChangePassword = lazy(() => import('./system/changePassword'))
const Menu1_1 = lazy(() => import('./nested/menu1/menu1-1'))
const Menu1_2_1 = lazy(() => import('./nested/menu1/menu1-2/menu1-2-1'))
const NotFound = lazy(() => import('./error/404'))
const AccountCenter = lazy(() => import('./account/center'))
const AccountSetting = lazy(() => import('./account/setting'))
const TableCom = lazy(() => import('./component/table'))
const FormCom = lazy(() => import('./component/form'))

export {
  About,
  Login,
  Dashboard,
  Doc,
  Explanation,
  Admin,
  Editor,
  Guest,
  Account,
  Role,
  Menu,
  ChangePassword,
  Department,
  Menu1_1,
  Menu1_2_1,
  NotFound,
  AccountCenter,
  AccountSetting,
  TableCom,
  FormCom,
}
