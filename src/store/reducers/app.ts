import * as types from '../action-types'
import {RootActions} from '../actions'
import {getLocale, setLocale} from '@/locales'
import defaultSettings from '@/defaultSetting'

export type Language = 'zh' | 'en' | 'id'

export interface AppStateProps {
  sidebarCollapsed: boolean
  showRightPanel: boolean
  lang: Language
  appEnterLoading: boolean
  intlLoading: boolean
}

const initialState: AppStateProps = {
  sidebarCollapsed: defaultSettings.sidebarCollapsed,
  showRightPanel: false,
  lang: getLocale() || defaultSettings.lang,
  appEnterLoading: true,
  intlLoading: false,
}

export default (state = initialState, action: RootActions): AppStateProps => {
  switch (action.type) {
    case types.SIDEBAR_COLLAPSED_TOGGLE:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    case types.SHOW_RIGHT_PANEL_TOGGLE:
      return {
        ...state,
        showRightPanel: !state.showRightPanel,
      }
    case types.TOGGLE_LANG:
      setLocale(action.payload)
      return {
        ...state,
        lang: action.payload,
      }
    case types.APP_ENTER_LOADING:
      return {
        ...state,
        appEnterLoading: action.payload,
      }
    case types.INTL_LOADING_TOGGLE:
      return {
        ...state,
        intlLoading: !state.intlLoading,
      }
    default:
      return state
  }
}
