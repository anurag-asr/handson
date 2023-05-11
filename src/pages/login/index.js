import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../graphQl/login";
import { useAuth } from "../auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    loginfunc({
      variables: {
        data: { email: values.username, password: values.password },
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    alert("Invalid Crendetial");
  };

  const redirectPath = location.state?.path || "/";
  const [loginfunc, { data }] = useMutation(LOGIN_MUTATION, {
    onCompleted(res) {
      console.log("completed", res);
      // auth.signin(true)
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        AUTH_TOKEN,
        data?.emailPasswordLogIn?.data?.token || "nakko"
      );
      navigate(redirectPath, { replace: true });
    }
  }, [data]);

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

// export const isAuthenticated =() =>{

//  }

export default Login;
