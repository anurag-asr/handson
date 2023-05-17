import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Card, Form, Input, Space, Spin } from 'antd';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { Logo } from '../../assets/svg/index';
import { ROUTES } from '../../common/constants';
import { formValidatorRules } from '../../common/utils';
import './auth.less';
import { LOGIN } from './graphql/Mutations';

const { required, email } = formValidatorRules;

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { initializeAuth } = useContext(AppContext);
  const [loginMutate, { loading: loginLoading }] = useMutation(LOGIN, {
    onError() {}, // Always write this method for error handling in all mutation.
  });

  function successCallback(accessToken, userData, refreshToken) {
    initializeAuth(accessToken, userData, refreshToken);
    history?.replace('/');
  }

  const onFinish = async (values) => {
    try {
      const formValues = {
        email: values?.email?.trim().toLowerCase(),
        password: values?.password?.trim(),
      };
      const response = await loginMutate({
        variables: { data: { ...formValues } },
      });
      if (response?.data) {
        const accessToken = response?.data?.emailPasswordLogIn?.data?.token;
        const userData = response?.data?.emailPasswordLogIn?.data?.user;
        const tokenRefresh =
          response?.data?.emailPasswordLogIn?.data?.refreshToken;

        if (successCallback) {
          successCallback(accessToken, userData, tokenRefresh);
        }
      } else {
        form?.setFieldsValue(values);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console?.error('error from login => ', error);
    }
  };

  return (
    <div className="auth-bg">
      <div className="login-wrap d-flex align-center justify-start">
        <Card className="full-width">
          <Spin spinning={loginLoading} wrapperClassName="full-width">
            <div className="text-center  mb-48">
              <Logo />
            </div>
            <Form
              name="Login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
              form={form}
            >
              <Form.Item
                name="email"
                rules={[{ required, message: 'Please enter email!' }, email]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                name="password"
                className="mb-8"
                rules={[{ required, message: 'Please enter password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter password"
                />
              </Form.Item>
              <Form.Item className="text-right mb-8">
                <Link to={ROUTES?.FORGET_PASSWORD}>Forgot password ?</Link>
              </Form.Item>
              <Form.Item className=" full-width mb-8">
                <Button type="primary" className="full-width" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Form.Item className="text-center mb-0">
                <Space>
                  Don't have an account yet ?
                  <Button
                    type="link"
                    className="p-0"
                    onClick={() => {
                      history?.push(ROUTES?.SIGNUP);
                    }}
                  >
                    Signup
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
        <div className="text-center login-copyrights">Logicwind © 2022</div>
      </div>
    </div>
  );
};

export default Login;
