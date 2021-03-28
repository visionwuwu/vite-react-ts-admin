import * as types from '../action-types'

export interface ISidebarCollapsedToggleAction {
  type: types.SIDEBAR_COLLAPSED_TOGGLE_TYPE
}

export interface IShowRightPanelAction {
  type: types.SHOW_RIGHT_PANEL_TOGGLE_TYPE
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

export type AppAction = ISidebarCollapsedToggleAction | IShowRightPanelAction
