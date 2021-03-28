import React from 'react'
import {Drawer, Alert, Switch, Button, Row, Col, Divider} from 'antd'
import {connect} from 'react-redux'
import {StoreStateProps} from 'store/reducers'
import {CopyOutlined, NotificationOutlined} from '@ant-design/icons'
import {bindActionCreators, Dispatch} from 'redux'
import {
  showRightPanelToggle,
  showLogoToggle,
  fixHeaderToggle,
  openTagsViewToggle,
} from 'store/actions'
import handleClipboard from 'utils/clipboard'
import './index.less'

interface IRightPanelProps {}

const RightPanel: React.FC<IRightPanelProps & IProps> = props => {
  const {
    showRightPanel,
    showLogo,
    fixHeader,
    openTagsView,
    showRightPanelToggle,
    showLogoToggle,
    fixHeaderToggle,
    openTagsViewToggle,
  } = props

  const copyText = `
    export default {
      showRightPanel: ${showRightPanel},
      showLogo: ${showLogo},
      fixHeader: ${fixHeader},
      openTagsView: ${openTagsView},
    }
  `

  return (
    <div className="right-panel-container">
      <Drawer
        className="right-panel-wapper"
        title="系统设置"
        visible={showRightPanel}
        placement="right"
        onClose={showRightPanelToggle}
        width={350}
      >
        <Row>
          <Col span={12}>侧边栏Logo</Col>
          <Col span={12}>
            <Switch
              checked={showLogo}
              checkedChildren="开"
              unCheckedChildren="关"
              onChange={showLogoToggle}
            ></Switch>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>固定Header</Col>
          <Col span={12}>
            <Switch
              checked={fixHeader}
              checkedChildren="开"
              unCheckedChildren="关"
              onChange={fixHeaderToggle}
            ></Switch>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>开启Tag-View</Col>
          <Col span={12}>
            <Switch
              checked={openTagsView}
              checkedChildren="开"
              unCheckedChildren="关"
              onChange={openTagsViewToggle}
            ></Switch>
          </Col>
        </Row>

        <Divider />

        <Alert
          type="warning"
          showIcon
          icon={<NotificationOutlined />}
          message="开发者请注意:"
          description="配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改/src/defaultSettings.js配置文件"
          style={{marginBottom: '16px'}}
        />

        <Button block onClick={e => handleClipboard(copyText, e)}>
          <CopyOutlined /> 拷贝设置
        </Button>
      </Drawer>
    </div>
  )
}

const mapStateToProps = (state: StoreStateProps) => ({
  showRightPanel: state.app.showRightPanel,
  showLogo: state.settings.showLogo,
  fixHeader: state.settings.fixHeader,
  openTagsView: state.settings.openTagsView,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showLogoToggle,
      showRightPanelToggle,
      fixHeaderToggle,
      openTagsViewToggle,
    },
    dispatch,
  )

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(RightPanel))
