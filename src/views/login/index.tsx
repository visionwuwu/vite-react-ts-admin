import React from 'react'
import {Form, Button, Input, Spin, notification} from 'antd'
import {login} from 'store/actions'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import Icon from 'comps/Icon'
import './index.less'

type ILoginProps = RouteComponentProps

const Login: React.FC<ILoginProps & ActionProps> = props => {
  const {login, history} = props

  const formSubmit = (values: any) => {
    login(values.username, values.password).then((data: any) => {
      if (data.code === 20000) {
        notification.success({
          message: '登录成功',
          description: `欢迎回来: ${values.username}`,
          duration: 3,
        })
        history.push('/dashboard')
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">用户登录</h2>
        <Spin spinning={false}>
          <Form name="login-form" size="middle" onFinish={formSubmit}>
            <Form.Item
              name="username"
              initialValue={'admin'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input
                prefix={<Icon icon="UserOutlined" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue={'admin'}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input
                type="password"
                prefix={<Icon icon="LockOutlined" />}
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <p>账号 : admin 密码 : 随便填</p>
              <p>账号 : editor 密码 : 随便填</p>
              <p>账号 : guest 密码 : 随便填</p>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

interface ActionProps {
  login: any
}

export default connect(null, {login})(withRouter(Login))
