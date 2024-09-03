import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { PASSWORD, USERNAME } from './Constants';

const Login = ({ onLogin }) => {
  const onFinish = (values) => {
    const { username, password } = values;
    if (username === USERNAME && password === PASSWORD) {
      console.log('Logged in');
      onLogin(username, password);
    } else {
      message.error('Invalid credentials');
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 300, margin: '0 auto' }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;