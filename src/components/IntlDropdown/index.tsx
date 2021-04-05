import React, {useState, memo, CSSProperties} from 'react'
import {Dropdown, Menu} from 'antd'
import Icon from 'comps/Icon'
import {toggleLang} from 'store/actions'
import {useAppDispatch, useAppSelector} from 'store/index'
import {MenuClickEventHandler} from 'rc-menu/lib/interface'
import {Language} from 'store/reducers/app'
import variables from 'styles/variables.module.less'
import {asyncIntlLoadingToggle, intlLoadingToggle} from 'store/actions'

interface IIntlDropdownProps {}

const IntlDropdown: React.FC<IIntlDropdownProps> = () => {
  const {lang} = useAppSelector(state => state.app)
  const [selectedKeys, setSelectedKeys] = useState<Language[]>(
    lang ? [lang] : [],
  )

  const style: CSSProperties = {
    display: 'inline-block',
  }

  const dispatch = useAppDispatch()

  const handleToggleLang: MenuClickEventHandler = info => {
    const {key} = info
    if (key === 'zh') {
      dispatch(toggleLang(key))
      setSelectedKeys([key])
    } else if (key === 'en') {
      dispatch(toggleLang(key))
      setSelectedKeys([key])
    } else if (key === 'id') {
      dispatch(toggleLang(key))
      setSelectedKeys([key])
    }
    console.log('切换语言动画开始')
    dispatch(asyncIntlLoadingToggle() as any).then(() => {
      dispatch(intlLoadingToggle())
      console.log('切换语言动画完成')
    })
  }

  const langMenu = (
    <Menu selectedKeys={selectedKeys}>
      <Menu.Item key="zh" onClick={handleToggleLang}>
        简体中文
      </Menu.Item>
      <Menu.Item key="en" onClick={handleToggleLang}>
        English
      </Menu.Item>
      <Menu.Item key="id" onClick={handleToggleLang}>
        印尼文
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={langMenu} placement="bottomCenter">
      <div className="intl-container" style={style}>
        <Icon
          icon="GlobalOutlined"
          size={16}
          color={variables['primary-text']}
        />
      </div>
    </Dropdown>
  )
}

export default memo(IntlDropdown)
