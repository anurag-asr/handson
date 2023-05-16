import React from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../graphql/login";
import { AUTH_TOKEN } from "../../common/constant";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    loginDetails({
      variables: {
        data: { email: values.username, password: values.password },
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    alert("Invalid Credential");
  };

  const redirectPath = location.state?.path || "/";

  const [loginDetails] = useMutation(LOGIN_MUTATION, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      localStorage.setItem(
        AUTH_TOKEN,
        res?.emailPasswordLogIn?.data?.token || []
      );
      navigate(redirectPath, { replace: true });
    },
  });

  return (
    <div className="login_page">
      <div className="login_page_form_div">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
