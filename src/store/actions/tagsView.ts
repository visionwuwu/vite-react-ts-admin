import * as types from '../action-types'
import {TagViewProps} from '../reducers/tagsView'

interface AddTagsViewAction {
  type: types.ADD_TAGS_VIEW_TYPE
  payload: TagViewProps
}

interface RemoveTagsViewAction {
  type: types.REMOVE_TAGS_VIEW_TYPE
  payload: TagViewProps
}

interface CloseAllTagsViewAction {
  type: types.CLOSE_ALL_TAGS_VIEW_TYPE
}

interface CloseOthersTagViewAction {
  type: types.CLOSE_OTHERS_TAG_VIEW_TYPE
  payload: TagViewProps
}

export const addTagsView = (payload: TagViewProps): AddTagsViewAction => {
  return {
    type: types.ADD_TAGS_VIEW,
    payload,
  }
}

export const removeTagsView = (payload: TagViewProps): RemoveTagsViewAction => {
  return {
    type: types.REMOVE_TAGS_VIEW,
    payload,
  }
}

export const closeAllTagsView = (): CloseAllTagsViewAction => {
  return {
    type: types.CLOSE_ALL_TAGS_VIEW,
  }
}

export const closeOthersTagView = (
  payload: TagViewProps,
): CloseOthersTagViewAction => {
  return {
    type: types.CLOSE_OTHERS_TAG_VIEW,
    payload,
  }
}

export type TagsViewActions =
  | AddTagsViewAction
  | RemoveTagsViewAction
  | CloseAllTagsViewAction
  | CloseOthersTagViewAction
