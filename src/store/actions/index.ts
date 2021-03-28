import {sidebarCollapsedToggle, showRightPanelToggle, AppAction} from './app'
import {
  fixHeaderToggle,
  showLogoToggle,
  openTagsViewToggle,
  SettingsAction,
} from './settings'
import {setUserToken, UserAction, getUserinfo} from './user'
import {login, logout, AuthAction} from './auth'
import {
  addTagsView,
  removeTagsView,
  closeAllTagsView,
  closeOthersTagView,
  TagsViewActions,
} from './tagsView'

export type RootActions =
  | AppAction
  | SettingsAction
  | UserAction
  | AuthAction
  | TagsViewActions

export {
  setUserToken,
  sidebarCollapsedToggle,
  showLogoToggle,
  showRightPanelToggle,
  fixHeaderToggle,
  openTagsViewToggle,
  login,
  logout,
  getUserinfo,
  addTagsView,
  removeTagsView,
  closeOthersTagView,
  closeAllTagsView,
}
