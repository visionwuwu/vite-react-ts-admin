import * as React from 'react'
import {Row, Col} from 'antd'
import {
  UserOutlined,
  MessageOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import './index.less'

interface IPanelGroupProps {}

const PanelGroup: React.FC<IPanelGroupProps> = () => {
  return (
    <div className="panel-group-container">
      <Row className="panel-group" gutter={20}>
        <Col className="card-panel-col" lg={6} sm={12} xs={12}>
          <div className="card-panel-card">
            <div className="card-panel-icon-wrap">
              <UserOutlined style={{color: '#40c9c6'}} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">New Visits</p>
              <span className="card-panel-number">10024</span>
            </div>
          </div>
        </Col>
        <Col className="card-panel-col" lg={6} sm={12} xs={12}>
          <div className="card-panel-card">
            <div className="card-panel-icon-wrap">
              <MessageOutlined style={{color: '#36a3f7'}} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">Messages</p>
              <span className="card-panel-number">81212</span>
            </div>
          </div>
        </Col>
        <Col className="card-panel-col" lg={6} sm={12} xs={12}>
          <div className="card-panel-card">
            <div className="card-panel-icon-wrap">
              <PayCircleOutlined style={{color: '#f4516c'}} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">Purchases</p>
              <span className="card-panel-number">9280</span>
            </div>
          </div>
        </Col>
        <Col className="card-panel-col" lg={6} sm={12} xs={12}>
          <div className="card-panel-card">
            <div className="card-panel-icon-wrap">
              <ShoppingCartOutlined style={{color: '#f6ab40'}} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">Shoppings</p>
              <span className="card-panel-number">13600</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PanelGroup
