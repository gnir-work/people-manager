import React, { useEffect, useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import "./LoginPage.scss";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

interface LoginPageProps {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { span: 16 }
};

const LoginPage: React.FC<LoginPageProps> = () => {
  const { login, username } = useContext(UserContext);
  const history = useHistory();

  const onFinish = (values: any) => {
    login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!!username) {
      history.replace("/");
    }
  }, [username, history]);

  return (
    <div className="login-container">
      <h1 className="logo"> לוגו מגניב פה </h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="משתמש"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="סיסמא"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="submit-button" {...tailLayout}>
          <Button type="primary" htmlType="submit">
            התחבר
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
