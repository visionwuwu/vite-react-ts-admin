import React from 'react'
import {Line} from '@ant-design/charts'

const style: React.CSSProperties = {
  padding: '12px',
  backgroundColor: '#fff',
  marginBottom: '25px',
}

interface ILineChartProps {
  chartData: any
}

const LineChart: React.FC<ILineChartProps> = props => {
  const {chartData} = props
  const config: any = {
    width: '100%',
    height: 350,
    data: chartData,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v: any) {
          return ''.concat((v / 1000000000).toFixed(1), ' B')
        },
      },
    },
    legend: {position: 'top'},
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1500,
      },
    },
  }
  return (
    <div className="line-chart-container" style={style}>
      <Line style={{height: '325px'}} {...config} />
    </div>
  )
}

export default LineChart
