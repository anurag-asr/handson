import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../Constants";
import { useNavigate } from "react-router-dom";


const LOGIN_MUTATION = gql`
  mutation EmailandPassword($data:EmailPasswordLogInData!){
  emailPasswordLogIn(data:$data){
    message
    data{
     token
      refreshToken
      user{
        id
        email
        profileImage
        name
        firstName
      }
    }
  }
}
`

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  
  const onFinish = async(values) => {
    await setEmail(values.username)
    await setPassword(values.password)
    loginfunc()
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
    alert("Invalid Crendetial")
  };
  
  const [loginfunc,{data}] = useMutation(LOGIN_MUTATION, {
    variables: {
     data:{
      email: email,
      password: password
     }
    }
  });

  if(data){
    localStorage.setItem(AUTH_TOKEN, data?.emailPasswordLogIn?.data?.token || "nakko");
    navigate('/');
  }

  console.log(data)
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
          style={{
            maxWidth: 600,
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
   
    </div>
  );
};

export default Login;
