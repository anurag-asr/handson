import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { ROUTES } from '../../common/constants';
import LoaderComponent from '../../components/LoaderComponent';
import { REFRESH_TOKEN } from './graphql/Queries';

const RefreshToken = () => {
  const { initializeAuth, getRefreshToken } = useContext(AppContext);
  const history = useHistory();
  const {
    location: { state },
  } = history;
  const refreshToken = getRefreshToken();
  function successCallback(accessToken, userData) {
    initializeAuth(accessToken, userData);
  }

  const [refresh, { loading }] = useLazyQuery(REFRESH_TOKEN, {
    fetchPolicy: 'network-only',
    onCompleted(response) {
      const accessToken = response?.refreshToken?.token;
      const userData = response?.refreshToken?.user;
      successCallback(accessToken, userData);
      if (state?.from) {
        history?.replace(state?.from);
      } else {
        history?.goBack();
      }
    },
    onError() {
      history?.replace(ROUTES?.LOGOUT);
    },
  });

  useEffect(() => {
    if (refreshToken)
      refresh({
        variables: {
          data: {
            refreshToken,
          },
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoaderComponent />;

  return null;
};

export default RefreshToken;
