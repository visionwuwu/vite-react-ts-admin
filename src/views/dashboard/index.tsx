import React from 'react'
import {Row, Col} from 'antd'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RadarChart from './components/RadarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import './index.less'

export interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {
  return (
    <div className="app-container">
      <a
        href="https://github.com/visionwuwu/react-antd-admin-visionwu"
        target="_blank"
        rel="noopener noreferrer"
        className="github-corner"
      >
        {' '}
      </a>

      <PanelGroup />

      <LineChart />

      <Row gutter={32}>
        <Col lg={8} sm={24} xs={24}>
          <div className="chart-wrapper">
            <RadarChart />
          </div>
        </Col>
        <Col lg={8} sm={24} xs={24}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col lg={8} sm={24} xs={24}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={{paddingRight: '8px', marginBottom: '30px'}}
        >
          <TransactionTable />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{marginBottom: '30px'}}
        >
          <BoxCard />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
