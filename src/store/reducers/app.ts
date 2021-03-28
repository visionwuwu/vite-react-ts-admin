import * as types from '../action-types'
import {RootActions} from '../actions'

export interface AppStateProps {
  sidebarCollapsed: boolean
  showRightPanel: boolean
}

const initialState: AppStateProps = {
  sidebarCollapsed: false,
  showRightPanel: false,
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
    default:
      return state
  }
}
