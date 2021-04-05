import * as types from '../action-types'
import {Language} from '../reducers/app'
import {Dispatch} from 'redux'

export interface ISidebarCollapsedToggleAction {
  type: types.SIDEBAR_COLLAPSED_TOGGLE_TYPE
}

export interface IShowRightPanelAction {
  type: types.SHOW_RIGHT_PANEL_TOGGLE_TYPE
}

export interface IToggleLangAction {
  type: types.TOGGLE_LANG_TYPE
  payload: Language
}

export interface IToggleAppEnterLoadingAction {
  type: types.APP_ENTER_LOADING_TYPE
  payload: boolean
}

export interface IIntlLoadingToggleAction {
  type: types.INTL_LOADING_TOGGLE_TYPE
}

export const sidebarCollapsedToggle = (): ISidebarCollapsedToggleAction => {
  return {
    type: types.SIDEBAR_COLLAPSED_TOGGLE,
  }
}

export const showRightPanelToggle = (): IShowRightPanelAction => {
  return {
    type: types.SHOW_RIGHT_PANEL_TOGGLE,
  }
}

export const toggleLang = (payload: Language): IToggleLangAction => {
  return {
    type: types.TOGGLE_LANG,
    payload,
  }
}

export const toggleAppEnterLoading = (
  payload: boolean,
): IToggleAppEnterLoadingAction => {
  return {
    type: types.APP_ENTER_LOADING,
    payload,
  }
}

export const intlLoadingToggle = (): IIntlLoadingToggleAction => {
  return {
    type: types.INTL_LOADING_TOGGLE,
  }
}

export const asyncIntlLoadingToggle = () => (
  dispatch: Dispatch,
): Promise<any> => {
  return new Promise(resolve => {
    dispatch(intlLoadingToggle())
    setTimeout(() => {
      resolve(true)
    }, 600)
  })
}

export type AppAction =
  | ISidebarCollapsedToggleAction
  | IShowRightPanelAction
  | IToggleLangAction
  | IToggleAppEnterLoadingAction
  | IIntlLoadingToggleAction
