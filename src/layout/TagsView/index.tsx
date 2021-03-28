import React, {useCallback, useState, MouseEvent, useRef, useMemo} from 'react'
import {Tag} from 'antd'
import {Scrollbars} from 'react-custom-scrollbars'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import {bindActionCreators, Dispatch} from 'redux'
import {
  removeTagsView,
  closeAllTagsView,
  closeOthersTagView,
} from 'store/actions'
import {TagViewProps} from 'store/reducers/tagsView'
import {RouteComponentProps, withRouter} from 'react-router'
import useClickOutside from 'hooks/useClickOutside'
import './index.less'

type ITagsViewProps = RouteComponentProps

interface IMenuPosition {
  left: number
  top: number
}

const TagsView: React.FC<ITagsViewProps & IProps> = props => {
  const {
    location,
    history,
    tagsList,
    removeTagsView,
    closeAllTagsView,
    closeOthersTagView,
  } = props

  const [menuVisible, setMenuVisiable] = useState(false)
  const contextMenuRef = useRef(null)
  const [currentTag, setCurrentTag] = useState<TagViewProps | null>(null)
  const [menuPosition, setMenuPosition] = useState<IMenuPosition>({
    left: 0,
    top: 0,
  })

  // 自定义点击元素外面 hooks
  useClickOutside(contextMenuRef, () => {
    setMenuVisiable(false)
    setCurrentTag(null)
  })

  const scrollbarStyle = useMemo(() => {
    return {
      width: '100%',
      height: 36,
    }
  }, [])

  const handleCloseTag = useCallback(
    (tag: TagViewProps) => {
      const removeTagIndex = tagsList.findIndex(item => item.path === tag.path)
      let toTag
      // 找不到要删除的或者删除的是第一个
      if (removeTagIndex === -1 || removeTagIndex === 0) {
        return
      } else if (tagsList.length - 1 === removeTagIndex) {
        // 删除最后一个
        toTag = tagsList[removeTagIndex - 1]
      } else if (removeTagIndex >= 1) {
        // 删除中间的
        toTag = tagsList[removeTagIndex + 1]
      }
      if (toTag) {
        history.push(toTag.path)
      }
      removeTagsView(tag)
    },
    [tagsList],
  )

  const handleClickTag = useCallback(
    (tag: TagViewProps) => {
      if (location.pathname !== tag.path) {
        history.push(tag.path)
      }
    },
    [location],
  )

  const handleOpenContextMenu = (tag: TagViewProps, e: MouseEvent) => {
    e.preventDefault()
    const menuMinWidth = 100
    const maxLeft = document.documentElement.clientWidth - menuMinWidth
    const clientX = e.clientX
    const clientY = e.clientY
    setMenuVisiable(true)
    setCurrentTag(tag)
    // 当鼠标点击位置大于左侧边界时，说明鼠标点击的位置偏右，将菜单放在左边
    if (clientX > maxLeft) {
      setMenuPosition({
        left: clientX - menuMinWidth,
        top: clientY,
      })
    } else {
      // 反之，当鼠标点击的位置偏左，将菜单放在右边
      setMenuPosition({
        left: clientX,
        top: clientY,
      })
    }
  }

  const handleCloseOthersTag = () => {
    if (currentTag) {
      const {path} = currentTag
      closeOthersTagView(currentTag)
      history.push(path)
      setMenuVisiable(false)
    }
  }

  const handleCloseAllTags = () => {
    closeAllTagsView()
    history.push('/dashboard')
    setMenuVisiable(false)
  }

  return (
    <div className="tagsView-container">
      <Scrollbars
        style={scrollbarStyle}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        hideTracksWhenNotNeeded={true}
        renderView={props => <div {...props} className="scrollbar-container" />}
        renderTrackVertical={props => (
          <div {...props} className="scrollbar-track-vertical" />
        )}
      >
        <ul className="tags-wrap">
          {tagsList.map(tag => {
            const color = location.pathname === tag.path ? 'geekblue' : 'gold'
            const closable = tag.path !== '/dashboard'
            return (
              <li key={tag.path}>
                <Tag
                  color={color}
                  closable={closable}
                  onClose={handleCloseTag.bind(null, tag)}
                  onClick={handleClickTag.bind(null, tag)}
                  onContextMenu={handleOpenContextMenu.bind(null, tag)}
                >
                  {tag.title}
                </Tag>
              </li>
            )
          })}
        </ul>
      </Scrollbars>
      {menuVisible && (
        <ul
          ref={contextMenuRef}
          className="contextMenu"
          style={{
            left: menuPosition.left + 'px',
            top: menuPosition.top + 'px',
          }}
        >
          <li className="contextMenu-item" onClick={handleCloseOthersTag}>
            关闭其他
          </li>
          <li className="contextMenu-item" onClick={handleCloseAllTags}>
            关闭所有
          </li>
        </ul>
      )}
    </div>
  )
}

const mapStateToProps = (state: StoreStateProps) => ({
  tagsList: state.tagsView.tagsList,
  sidebarCollapsed: state.app.sidebarCollapsed,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeTagsView,
      closeOthersTagView,
      closeAllTagsView,
    },
    dispatch,
  )

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TagsView))
