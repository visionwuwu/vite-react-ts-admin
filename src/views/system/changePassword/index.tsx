import React from 'react'
import {PageHeader, Form, Input, Button} from 'antd'
import './index.less'

interface IChangePasswordProps {}

const ChangePassword: React.FC<IChangePasswordProps> = () => {
  return (
    <div>
      <PageHeader title="修改当前用户密码" className="bg-white">
        <p>修改成功后会自动退出当前登录！</p>
      </PageHeader>
      <div className="app-container">
        <div
          className="d-flex justify-content-center align-items-center bg-white"
          style={{padding: '2rem 0'}}
        >
          <Form
            labelAlign="right"
            className="bg-white w-3/4"
            labelCol={{span: 3}}
            size="large"
          >
            <Form.Item
              label="当前密码"
              name="cpass"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input.Password allowClear placeholder="请输入" type="password" />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="npass"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input.Password allowClear placeholder="新密码" type="password" />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmpass"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input.Password allowClear placeholder="请输入" type="password" />
            </Form.Item>
            <Form.Item wrapperCol={{span: 24}} style={{textAlign: 'center'}}>
              <Button htmlType="button" className="mx-2">
                重置
              </Button>
              <Button type="primary" htmlType="submit" className="mx-2">
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
