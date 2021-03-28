import {AnyAction, combineReducers, ReducersMapObject, Reducer} from 'redux'
import app, {AppStateProps} from './app'
import user, {UserStateProps} from './user'
import settings, {SettingsStateProps} from './settings'
import tagsView, {TagsViewStateProps} from './tagsView'
import {RootActions} from '../actions'

export type StoreActions = AnyAction | RootActions

export interface StoreStateProps {
  app: AppStateProps
  user: UserStateProps
  settings: SettingsStateProps
  tagsView: TagsViewStateProps
}

const reducers: ReducersMapObject<StoreStateProps, StoreActions> = {
  app,
  user,
  settings,
  tagsView,
}

const reducer: Reducer<StoreStateProps, StoreActions> = combineReducers(
  reducers,
)

export default reducer
