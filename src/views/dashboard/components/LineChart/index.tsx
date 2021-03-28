import React, {useState, useEffect} from 'react'
import {Line} from '@ant-design/charts'

const style: React.CSSProperties = {
  padding: '12px',
  backgroundColor: '#fff',
  height: '350px',
  width: '100%',
  marginBottom: '25px',
  boxSizing: 'border-box',
}

const LineChart: React.FC = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    asyncFetch()
  }, [])
  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error)
      })
  }
  const config: any = {
    data: data,
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
        duration: 5000,
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
