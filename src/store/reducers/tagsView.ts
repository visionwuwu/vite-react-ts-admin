import * as types from '../action-types'
import {RootActions} from '../actions'

export interface TagViewProps {
  title: string
  path: string
}

export interface TagsViewStateProps {
  tagsList: Array<TagViewProps>
}

const initialState: TagsViewStateProps = {
  tagsList: [],
}

export default (
  state = initialState,
  action: RootActions,
): TagsViewStateProps => {
  let currentTagView: TagViewProps
  let hasTagView: TagViewProps | undefined
  switch (action.type) {
    case types.ADD_TAGS_VIEW:
      currentTagView = action.payload
      hasTagView = state.tagsList.find(tag => tag.path === currentTagView.path)
      return {
        ...state,
        tagsList: hasTagView
          ? [...state.tagsList]
          : [...state.tagsList, currentTagView],
      }
    case types.REMOVE_TAGS_VIEW:
      currentTagView = action.payload
      return {
        ...state,
        tagsList: state.tagsList.filter(
          tagView =>
            tagView.title !== currentTagView.title &&
            tagView.path !== currentTagView.path,
        ),
      }
    case types.CLOSE_ALL_TAGS_VIEW:
      return {
        ...state,
        tagsList: [],
      }
    case types.CLOSE_OTHERS_TAG_VIEW:
      currentTagView = action.payload
      return {
        ...state,
        tagsList: state.tagsList.filter(
          tagView =>
            tagView.path === '/dashboard' ||
            tagView.path === currentTagView.path,
        ),
      }
    default:
      return state
  }
}
