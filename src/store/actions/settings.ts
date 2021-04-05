import * as types from '../action-types'
import {CollapsedMenuBtnPosition} from 'root/src/defaultSetting'

export interface IShowLogoAction {
  type: types.SHOW_LOGO_TOGGLE_TYPE
}

export interface IFixHeaderAction {
  type: types.FIX_HEADER_TOGGLE_TYPE
}

export interface IOpenTagsViewAction {
  type: types.OPEN_TAGS_VIEW_TYPE
}

export interface ISetShowSidebarAction {
  type: types.SET_SHOW_SIDEBAR_TYPE
  payload: boolean
}

export interface IToggleBreadcrumbAction {
  type: types.BREADCRUMB_TOGGLE_TYPE
}

export interface IFixSidebarAction {
  type: types.FIX_SIDEBAR_TOGGLE_TYPE
}

export interface ISetCollapsedMenuBtnPositionAction {
  type: types.COLLAPSED_MENU_BTN_POSITION_TYPE
  payload: CollapsedMenuBtnPosition
}

export interface IWeekModeToggleAction {
  type: types.WEEK_MODE_TOGGLE_TYPE
}

export interface IGrayModeToggleAction {
  type: types.GRAY_MODE_TOGGLE_TYPE
}

export const showLogoToggle = (): IShowLogoAction => {
  return {
    type: types.SHOW_LOGO_TOGGLE,
  }
}

export const fixHeaderToggle = (): IFixHeaderAction => {
  return {
    type: types.FIX_HEADER_TOGGLE,
  }
}

export const fixSidebarToggle = (): IFixSidebarAction => {
  return {
    type: types.FIX_SIDEBAR_TOGGLE,
  }
}

export const openTagsViewToggle = (): IOpenTagsViewAction => {
  return {
    type: types.OPEN_TAGS_VIEW,
  }
}

export const setShowSidebar = (payload: boolean): ISetShowSidebarAction => {
  return {
    type: types.SET_SHOW_SIDEBAR,
    payload,
  }
}

export const breadcrumbToggle = (): IToggleBreadcrumbAction => {
  return {
    type: types.BREADCRUMB_TOGGLE,
  }
}

export const setCollapsedMenuBtnPosition = (
  payload: CollapsedMenuBtnPosition,
): ISetCollapsedMenuBtnPositionAction => {
  return {
    type: types.COLLAPSED_MENU_BTN_POSITION,
    payload,
  }
}

export const weekModeToggle = (): IWeekModeToggleAction => {
  return {
    type: types.WEEK_MODE_TOGGLE,
  }
}

export const grayModeToggle = (): IGrayModeToggleAction => {
  return {
    type: types.GRAY_MODE_TOGGLE,
  }
}

export type SettingsAction =
  | IShowLogoAction
  | IFixHeaderAction
  | IFixSidebarAction
  | IOpenTagsViewAction
  | ISetShowSidebarAction
  | IToggleBreadcrumbAction
  | ISetCollapsedMenuBtnPositionAction
  | IWeekModeToggleAction
  | IGrayModeToggleAction
