import React, {
  useState,
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  memo,
} from 'react'
import {Input, Modal, Empty} from 'antd'
import IconPickerData, {IconPickerName} from '../data/IconPicker'
import Icon from '../Icon'
import classnames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import './index.less'

/** 图标选择器组件暴露到外部的属性 */
export interface IconPrickerImperativeProps {
  openIconPicker: (
    handleSelected: (iconName: IconPickerName) => void,
    iconName?: string,
  ) => void
  closeIconPicker: () => void
}

/** 图标选择器属性定义 */
export interface IIconPickerProps {
  /** 当前组件在外部的引用 */
  ref: any
  /** 选中的icon名称 */
  // iconName?: IconPickerName
  /** 点击icon触发的回调 */
  // onSelect: (icon: string) => void
}

/** 图标列表项属性定义 */
interface IIconItem {
  selectedIconName: IconPickerName | undefined
  iconName: IconPickerName
  onSelect: (icon: IconPickerName) => void
}

const IconItem: React.FC<IIconItem> = props => {
  const {selectedIconName, iconName, onSelect} = props

  const classes = classnames('icon-item', {
    'is-active': selectedIconName === iconName,
  })

  const handleClickIcon = (iconName: IconPickerName) => {
    onSelect && onSelect(iconName)
  }

  return (
    <li className={classes} onClick={handleClickIcon.bind(null, iconName)}>
      <Icon icon={iconName as any} size={21} />
      <p className="icon-name">{iconName}</p>
    </li>
  )
}

// eslint-disable-next-line
const IconPicker: React.FC<IIconPickerProps> = forwardRef((props, ref) => {
  // const {iconName} = props
  /** 当前选中的图标 */
  const [selectedIconName, setSelectedIconName] = useState<
    IconPickerName | undefined
  >(undefined)
  const [searchIcon, setSearchIcon] = useState('')
  // eslint-disable-next-line
  const selectedRef = useRef((iconName: IconPickerName) => {})
  const [visible, setVisible] = useState(false)

  /** 计算后的iconList */
  const iconList = useMemo(() => {
    return IconPickerData.filter(iconName => {
      return (
        iconName.toLocaleLowerCase().indexOf(searchIcon.toLocaleLowerCase()) >
        -1
      )
    })
  }, [IconPickerData, searchIcon])

  /** 处理搜索图标 */
  const handleSearchIcon: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value.trim()
    setSearchIcon(value)
  }

  /** 处理关闭弹框 */
  const handleCloseModal = () => {
    setVisible(false)
  }

  /** 点击选中图标处理 */
  const handleSelect = (iconName: IconPickerName) => {
    setSelectedIconName(iconName)
    selectedRef.current(iconName)
    setVisible(false)
  }

  /** 渲染图标列表 */
  const renderIconList = useMemo(() => {
    return iconList.map((iconName, index) => {
      return (
        <IconItem
          key={index}
          selectedIconName={selectedIconName}
          iconName={iconName}
          onSelect={handleSelect}
        />
      )
    })
  }, [iconList, selectedIconName])

  /** 暴露到组件外部 */
  useImperativeHandle<unknown, IconPrickerImperativeProps>(ref, () => {
    return {
      openIconPicker: (handleSelected, iconName) => {
        selectedRef.current = handleSelected
        setSelectedIconName(iconName as any)
        setVisible(true)
      },
      closeIconPicker: () => {
        setVisible(false)
      },
    }
  })

  return (
    <Modal
      title="挑选图标"
      width={500}
      className="icon-picker-modal"
      closable
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Input
        className="icon-picker-search"
        width="100%"
        placeholder="搜索图标"
        value={searchIcon}
        onChange={handleSearchIcon}
        allowClear
        suffix={<Icon icon="SearchOutlined" />}
      />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={410}
        autoHeightMax={410}
        thumbSize={50}
      >
        <ul className="icon-list">
          {renderIconList.length > 0 ? (
            renderIconList
          ) : (
            <Empty style={{width: '100%'}} />
          )}
        </ul>
      </Scrollbars>
    </Modal>
  )
})

export default memo(IconPicker)
