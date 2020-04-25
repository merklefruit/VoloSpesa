import React from "react";
import { Typography, Form, Input, Button, message } from "antd";
import PageLayout from "../../components/Layout/PageLayout";

import "./admin.css";

const { Title } = Typography;

const onFinish = values => {};

const onFinishFailed = errorInfo => {
  console.log("Failed:", errorInfo);
};

function Login() {
  return (
    <PageLayout>
      <div className="center">
        <Title>Login amministratore</Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
}

export default Login;
