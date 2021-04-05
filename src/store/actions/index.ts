import {Types} from '../action-types'
import {Dispatch} from 'react'
import {Action, AnyAction} from 'redux'
import {
  sidebarCollapsedToggle,
  showRightPanelToggle,
  AppAction,
  toggleLang,
  toggleAppEnterLoading,
  asyncIntlLoadingToggle,
  intlLoadingToggle,
} from './app'
import {
  fixHeaderToggle,
  fixSidebarToggle,
  showLogoToggle,
  openTagsViewToggle,
  SettingsAction,
  setShowSidebar,
  breadcrumbToggle,
  setCollapsedMenuBtnPosition,
  weekModeToggle,
  grayModeToggle,
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

/** 自定义通用同步Action */
export interface CommonAction<T = any> {
  type: Types
  payload?: T
}

/** 自定义通用同步ActionCreator */
export interface CommonActionCreator<T = any> {
  (options?: T): CommonAction<T>
}

/** 自定义通用异步ActionCreator*/
export interface CommonAsyncActionCreator<
  T = any,
  R = any,
  A extends Action = AnyAction
> {
  (options?: T): (dispatch: Dispatch<A>) => R
}

/** 应用ActionCreator */
export interface RootActionsCreator {
  (): RootActions
}

/** 应用Actions */
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
  fixSidebarToggle,
  openTagsViewToggle,
  login,
  logout,
  getUserinfo,
  addTagsView,
  removeTagsView,
  closeOthersTagView,
  closeAllTagsView,
  toggleLang,
  toggleAppEnterLoading,
  setShowSidebar,
  breadcrumbToggle,
  setCollapsedMenuBtnPosition,
  weekModeToggle,
  grayModeToggle,
  asyncIntlLoadingToggle,
  intlLoadingToggle,
}
