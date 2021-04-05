import * as types from '../action-types'
import {RootActions} from '../actions'
import defaultSettings, {CollapsedMenuBtnPosition} from '@/defaultSetting'

export interface SettingsStateProps {
  showLogo: boolean
  fixHeader: boolean
  fixSidebar: boolean
  openTagsView: boolean
  showSidebar: boolean
  showBreadcrumb: boolean
  collapsedMenuBtnPosition: CollapsedMenuBtnPosition
  weekMode: boolean
  grayMode: boolean
}

const initialState: SettingsStateProps = {
  showLogo: defaultSettings.showLogo,
  fixHeader: defaultSettings.fixHeader,
  fixSidebar: defaultSettings.fixSidebar,
  openTagsView: defaultSettings.openTagsView,
  showSidebar: defaultSettings.showSidebar,
  showBreadcrumb: defaultSettings.showBreadcrumb,
  collapsedMenuBtnPosition: defaultSettings.collapsedMenuBtnPosition,
  weekMode: defaultSettings.weekMode,
  grayMode: defaultSettings.weekMode,
}

export default (
  state = initialState,
  action: RootActions,
): SettingsStateProps => {
  switch (action.type) {
    case types.SHOW_LOGO_TOGGLE:
      return {
        ...state,
        showLogo: !state.showLogo,
      }
    case types.FIX_HEADER_TOGGLE:
      return {
        ...state,
        fixHeader: !state.fixHeader,
      }
    case types.FIX_SIDEBAR_TOGGLE:
      return {
        ...state,
        fixSidebar: !state.fixSidebar,
      }
    case types.OPEN_TAGS_VIEW:
      return {
        ...state,
        openTagsView: !state.openTagsView,
      }
    case types.SET_SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      }
    case types.BREADCRUMB_TOGGLE:
      return {
        ...state,
        showBreadcrumb: !state.showBreadcrumb,
      }
    case types.COLLAPSED_MENU_BTN_POSITION:
      return {
        ...state,
        collapsedMenuBtnPosition: action.payload,
      }
    case types.WEEK_MODE_TOGGLE:
      return {
        ...state,
        weekMode: !state.weekMode,
      }
    case types.GRAY_MODE_TOGGLE:
      return {
        ...state,
        grayMode: !state.grayMode,
      }
    default:
      return state
  }
}
