import * as React from 'react'
import {Row, Col, Button} from 'antd'
import notFound from 'assets/images/404.png'
import {RouteComponentProps, withRouter} from 'react-router'
import './index.less'

type INotFoundProps = RouteComponentProps

const NotFound: React.FC<INotFoundProps> = props => {
  return (
    <div className="not-found-page">
      <Row>
        <Col span={12}>
          <img src={notFound} alt="404" />
        </Col>
        <Col span={12} className="right">
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <Button
            type="primary"
            onClick={() => props.history.push('/dashboard')}
          >
            回到首页
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(React.memo(NotFound))
