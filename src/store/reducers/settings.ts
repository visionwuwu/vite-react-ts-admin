import * as types from '../action-types'
import {RootActions} from '../actions'
import defaultSettings from '@/defaultSetting'

export interface SettingsStateProps {
  showLogo: boolean
  fixHeader: boolean
  openTagsView: boolean
}

const initialState: SettingsStateProps = {
  showLogo: defaultSettings.showLogo,
  fixHeader: defaultSettings.fixHeader,
  openTagsView: defaultSettings.openTagsView,
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
    case types.OPEN_TAGS_VIEW:
      return {
        ...state,
        openTagsView: !state.openTagsView,
      }
    default:
      return state
  }
}
