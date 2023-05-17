import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../common/constants';
import Profile from './Profile';

const ProfileWrapper = () => (
  <Switch>
    <Route path={ROUTES?.PROFILE} exact component={Profile} />
  </Switch>
);

export default ProfileWrapper;
