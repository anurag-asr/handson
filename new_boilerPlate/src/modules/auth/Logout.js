import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import LoaderComponent from '../../components/LoaderComponent';
import { LOGOUT_USER } from './graphql/Queries';

const Logout = () => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const [logout, { loading, error, data }] = useMutation(LOGOUT_USER, {
    onError() {},
  });

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoaderComponent />;

  if (error) {
    if (error?.graphQLErrors?.length) {
      const newErrors = error?.graphQLErrors?.[0];
      // eslint-disable-next-line no-console
      console?.log('newErrors => ', newErrors);
      dispatch({ type: 'LOGOUT' });
      // eslint-disable-next-line no-undef
      window.location = '/login';
      return null;
    }

    history?.goBack();
    return null;
  }

  if (data) {
    dispatch({ type: 'LOGOUT' });
    // eslint-disable-next-line no-undef
    window.location = '/login';
    return null;
  }

  return null;
};

export default Logout;
