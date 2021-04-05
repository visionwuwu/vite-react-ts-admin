import React from 'react'
import {Row, Col} from 'antd'
import Icon from 'comps/Icon'
import './index.less'

interface IPanelGroupProps {
  handleSetLineChartData: (type: string) => void
}

interface ChartItemProps {
  type: string
  icon: string
  num: number
  color: string
  size: number
}

const chartList: ChartItemProps[] = [
  {
    type: 'NewVisits',
    icon: 'UserOutlined',
    num: 102400,
    color: '#40c9c6',
    size: 55,
  },
  {
    type: 'Messages',
    icon: 'MessageOutlined',
    num: 81212,
    color: '#36a3f7',
    size: 55,
  },
  {
    type: 'Purchases',
    icon: 'PayCircleOutlined',
    num: 9280,
    color: '#f4516c',
    size: 55,
  },
  {
    type: 'Shoppings',
    icon: 'ShoppingCartOutlined',
    num: 13600,
    color: '#f6ab40',
    size: 55,
  },
]

const PanelGroup: React.FC<IPanelGroupProps> = props => {
  const {handleSetLineChartData} = props
  return (
    <div className="panel-group-container">
      <Row className="panel-group" gutter={20}>
        {chartList.map((chart, i) => {
          return (
            <Col
              key={i}
              className="card-panel-col"
              lg={6}
              md={6}
              sm={24}
              xs={24}
              onClick={handleSetLineChartData.bind(null, chart.type)}
            >
              <div className="card-panel-card">
                <div className="card-panel-icon-wrap">
                  <Icon
                    size={chart.size}
                    icon={chart.icon as any}
                    color={chart.color}
                  />
                </div>
                <div className="card-panel-description">
                  <p className="card-panel-text">{chart.type}</p>
                  <span className="card-panel-number">{chart.num}</span>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default PanelGroup
