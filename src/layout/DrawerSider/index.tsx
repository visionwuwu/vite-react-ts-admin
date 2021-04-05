import React, {CSSProperties, useContext} from 'react'
import Menu from '../Sider/Menu'
import Logo from '../Sider/Logo'
import {Drawer} from 'antd'
import {LayoutContext} from '../index'

interface IDrawerSiderProps {}

const DrawerSider: React.FC<IDrawerSiderProps> = () => {
  const {drawerVisible, setDrawerVisible} = useContext(LayoutContext)
  const bodyStyle: CSSProperties = {
    padding: '0',
    background: '#001529',
  }

  return (
    <Drawer
      width={200}
      visible={drawerVisible}
      placement="left"
      closable={false}
      onClose={() => setDrawerVisible(false)}
      bodyStyle={bodyStyle}
    >
      <Logo />
      <Menu />
    </Drawer>
  )
}

export default DrawerSider
