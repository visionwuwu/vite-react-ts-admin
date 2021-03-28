import * as types from '../action-types'
import {RoleName} from '@/config/routeMap'
import {getToken} from 'utils/auth'
import {RootActions} from '../actions'

export interface UserStateProps {
  username: string
  email?: string
  mobile?: string
  nickname?: string
  avatar: string
  token?: string
  roles: Array<RoleName>
  description?: string
  status?: boolean
}

const initialState: UserStateProps = {
  username: 'admin',
  avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  token: getToken() || 'admin-token',
  roles: [],
}

export default (state = initialState, action: RootActions): UserStateProps => {
  switch (action.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case types.RESET_USER:
      return {
        ...state,
        username: '',
        token: '',
        avatar: '',
        roles: [],
      }
    case types.SET_USERINFO:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
