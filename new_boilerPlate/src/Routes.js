import { CloseCircleOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { Result, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Router, Switch } from 'react-router-dom';
import App from './app/App';
import { AppContext } from './AppContext';
import {
  ERROR_PAGE_SUBTITLE,
  ERROR_PAGE_TITLE,
  ROUTES,
} from './common/constants';
import LoaderComponent from './components/LoaderComponent';
import MaintenancePage from './components/MaintenancePage';
import history from './historyData';
import ForgetPassword from './modules/auth/ForgetPassword';
import { GET_CURRENT_USER } from './modules/auth/graphql/Queries';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import RefreshToken from './modules/auth/RefreshToken';
import ResetPassword from './modules/auth/ResetPassword';
import Signup from './modules/auth/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const { Paragraph } = Typography;

const MyFallbackComponent = ({ error, componentStack }) => (
  <Result
    status="error"
    title={ERROR_PAGE_TITLE}
    subTitle={ERROR_PAGE_SUBTITLE}
  >
    <div className="desc">
      <Paragraph>
        <Typography.Title level={4}> Error:</Typography.Title>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
        {error?.message?.toString()}
      </Paragraph>
      <Paragraph>
        <Typography.Title level={4}> Stacktrace:</Typography.Title>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
        {componentStack}
      </Paragraph>
    </div>
  </Result>
);

const Routes = () => {
  const { initializeAuth, getToken } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const path = history?.location?.pathname;
  const idToken = getToken();

  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      initializeAuth(idToken, res?.getCurrentUser);
      setLoading(false);
    },
    onError: () => {
      history?.push(ROUTES?.LOGOUT);
      setLoading(false);
    },
  });
  useEffect(() => {
    if (path === ROUTES?.LOGOUT || idToken) {
      getCurrentUser();
    } else {
      setLoading(false);
    }

    // Below line is disabling Eslint auto fix we don't want any value in use effect array
    // We want to call initializeAuth once. Please add this line while you working with hooks and you want to call it once.
    // eslint-disable-next-line
  }, []);

  // use this variable from envs so that we can able to run maintenance page on runtime.
  const maintenance = process.env.REACT_APP_MAINTENANCE_ENABLE;

  if (loading) return <LoaderComponent />;

  return (
    <Sentry.ErrorBoundary fallback={MyFallbackComponent}>
      <Router history={history}>
        {maintenance === 'true' ? (
          <MaintenancePage />
        ) : (
          <Switch>
            <PublicRoute
              exact
              path={ROUTES?.FORGET_PASSWORD}
              component={ForgetPassword}
            />
            <PublicRoute exact path={ROUTES?.LOGIN} component={Login} />
            <PublicRoute exact path={ROUTES?.SIGNUP} component={Signup} />
            <PublicRoute exact path={ROUTES?.RESET} component={ResetPassword} />
            <PrivateRoute exact path={ROUTES?.LOGOUT} component={Logout} />
            <PrivateRoute
              exact
              path={ROUTES?.AUTHENTICATION}
              component={RefreshToken}
            />
            <PrivateRoute path={ROUTES?.MAIN} component={App} />
          </Switch>
        )}
      </Router>
    </Sentry.ErrorBoundary>
  );
};
export default Routes;
