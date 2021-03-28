import * as types from '../action-types'

export interface IShowLogoAction {
  type: types.SHOW_LOGO_TOGGLE_TYPE
}

export interface IFixHeaderAction {
  type: types.FIX_HEADER_TOGGLE_TYPE
}

export interface IOpenTagsViewAction {
  type: types.OPEN_TAGS_VIEW_TYPE
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

export const openTagsViewToggle = (): IOpenTagsViewAction => {
  return {
    type: types.OPEN_TAGS_VIEW,
  }
}

export type SettingsAction =
  | IShowLogoAction
  | IFixHeaderAction
  | IOpenTagsViewAction
