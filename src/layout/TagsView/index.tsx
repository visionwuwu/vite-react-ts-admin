import React, {useCallback, useState, MouseEvent, useRef, useMemo} from 'react'
import {Tag} from 'antd'
import {Scrollbars} from 'react-custom-scrollbars'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {
  removeTagsView,
  closeAllTagsView,
  closeOthersTagView,
} from 'store/actions'
import {TagViewProps} from 'store/reducers/tagsView'
import {useHistory, useLocation} from 'react-router'
import useClickOutside from 'hooks/useClickOutside'
import {useAppDispatch, useAppSelector} from 'root/src/store'
import {bindActionCreators} from 'redux'
import './index.less'

interface ITagsViewProps {}

interface IMenuPosition {
  left: number
  top: number
}

const TagsView: React.FC<ITagsViewProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const tagsList = useAppSelector(state => state.tagsView.tagsList)
  const dispatch = useAppDispatch()

  const actions = bindActionCreators(
    {
      removeTagsView,
      closeAllTagsView,
      closeOthersTagView,
    },
    dispatch,
  )

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
      actions.removeTagsView(tag)
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
      actions.closeOthersTagView(currentTag)
      history.push(path)
      setMenuVisiable(false)
    }
  }

  const handleCloseAllTags = () => {
    actions.closeAllTagsView()
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
        <TransitionGroup className="tags-wrap">
          {tagsList.map(tag => {
            const color = location.pathname === tag.path ? '#0960BD' : 'purple'
            const closable = tag.path !== '/dashboard'
            return (
              <CSSTransition
                key={tag.path}
                timeout={500}
                classNames="scaleIn"
                exit={false}
              >
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
              </CSSTransition>
            )
          })}
        </TransitionGroup>
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

export default TagsView
