import React, {CSSProperties, memo} from 'react'
import {Drawer, Alert, Switch, Button, Row, Col, Divider, Select} from 'antd'
import {CopyOutlined, NotificationOutlined} from '@ant-design/icons'
import {
  showRightPanelToggle,
  showLogoToggle,
  fixHeaderToggle,
  openTagsViewToggle,
  setShowSidebar,
  breadcrumbToggle,
  sidebarCollapsedToggle,
  fixSidebarToggle,
  setCollapsedMenuBtnPosition,
  weekModeToggle,
  grayModeToggle,
} from 'store/actions'
import handleClipboard from 'utils/clipboard'
import {useAppSelector} from 'root/src/store'
import useActions from 'hooks/useActions'
import Scrollbars from 'react-custom-scrollbars'
import {CollapsedMenuBtnPosition} from '@/defaultSetting'
const {Option} = Select
import './index.less'

interface IRightPanelProps {}

const RightPanel: React.FC<IRightPanelProps> = () => {
  /** 从store中获取state */
  const showRightPanel = useAppSelector(state => state.app.showRightPanel)
  const {
    showLogo,
    fixHeader,
    fixSidebar,
    openTagsView,
    showSidebar,
    showBreadcrumb,
    collapsedMenuBtnPosition,
    weekMode,
    grayMode,
  } = useAppSelector(state => state.settings)
  const {sidebarCollapsed} = useAppSelector(state => state.app)

  const actions = useActions(
    {
      showRightPanelToggle,
      showLogoToggle,
      fixHeaderToggle,
      openTagsViewToggle,
      setShowSidebar,
      breadcrumbToggle,
      sidebarCollapsedToggle,
      fixSidebarToggle,
      setCollapsedMenuBtnPosition,
      weekModeToggle,
      grayModeToggle,
    },
    [
      showRightPanelToggle,
      showLogoToggle,
      fixHeaderToggle,
      openTagsViewToggle,
      setShowSidebar,
      breadcrumbToggle,
      sidebarCollapsedToggle,
      fixSidebarToggle,
      setCollapsedMenuBtnPosition,
      weekModeToggle,
      grayModeToggle,
    ],
  )

  const copyText = `
    export default {
      showRightPanel: ${showRightPanel},
      showLogo: ${showLogo},
      fixHeader: ${fixHeader},
      openTagsView: ${openTagsView},
      showSidebar: ${showSidebar},
      showBreadcrumb: ${showBreadcrumb},
      sidebarCollapsed: ${sidebarCollapsed},
      fixSidebar: ${fixSidebar},
      collapsedMenuBtnPosition: ${collapsedMenuBtnPosition},
      weekMode: ${weekMode},
      grayMode: ${grayMode},
    }
  `

  const selectStyle: CSSProperties = {
    width: '120px',
  }

  return (
    <div className="right-panel-container">
      <Drawer
        className="right-panel-wrapper"
        title="系统设置"
        visible={showRightPanel}
        placement="right"
        onClose={actions.showRightPanelToggle}
        width={330}
      >
        <Scrollbars
          autoHide
          autoHideTimeout={350}
          autoHeightMin="100%"
          autoHeightMax="100%"
          thumbSize={50}
          renderView={props => <div {...props} className="scrollbar-view" />}
        >
          <Divider style={{margin: '0'}}>界面功能</Divider>

          <Row justify="space-between">
            <Col>固定Header</Col>
            <Col>
              <Switch
                checked={fixHeader}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.fixHeaderToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>固定Sidebar</Col>
            <Col>
              <Switch
                checked={fixSidebar}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.fixSidebarToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>折叠菜单</Col>
            <Col>
              <Switch
                checked={sidebarCollapsed}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.sidebarCollapsedToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>菜单折叠按钮</Col>
            <Col>
              <Select
                style={selectStyle}
                size="small"
                value={collapsedMenuBtnPosition}
                onChange={actions.setCollapsedMenuBtnPosition}
              >
                <Option value={CollapsedMenuBtnPosition.hide}>不显示</Option>
                <Option value={CollapsedMenuBtnPosition.top}>顶部</Option>
                <Option value={CollapsedMenuBtnPosition.bottom}>底部</Option>
              </Select>
            </Col>
          </Row>

          <Divider>界面显示</Divider>
          <Row justify="space-between">
            <Col>侧边栏Logo</Col>
            <Col>
              <Switch
                checked={showLogo}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.showLogoToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>开启Tag-View</Col>
            <Col>
              <Switch
                checked={openTagsView}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.openTagsViewToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>左侧菜单</Col>
            <Col>
              <Switch
                checked={showSidebar}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.setShowSidebar}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>面包屑</Col>
            <Col>
              <Switch
                checked={showBreadcrumb}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.breadcrumbToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>色弱模式</Col>
            <Col>
              <Switch
                checked={weekMode}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.weekModeToggle}
              ></Switch>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col>灰度模式</Col>
            <Col>
              <Switch
                checked={grayMode}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={actions.grayModeToggle}
              ></Switch>
            </Col>
          </Row>

          <Alert
            type="warning"
            showIcon
            icon={<NotificationOutlined />}
            message="开发者请注意:"
            description="配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改/src/defaultSettings.js配置文件"
            style={{marginBottom: '16px'}}
          />

          <Button
            block
            type="primary"
            onClick={e => handleClipboard(copyText, e)}
          >
            <CopyOutlined /> 拷贝设置
          </Button>
        </Scrollbars>
      </Drawer>
    </div>
  )
}

export default memo(RightPanel)
