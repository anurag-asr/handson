import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../common/constants';
import Error404 from '../Error404';
import DashboardWrapper from '../modules/Dashboard';
import MoviesWrapper from '../modules/movies';
import ProfileWrapper from '../modules/profile';
import SampleWrapper from '../modules/sample';

const ContentRoutes = () => (
  <Switch>
    <Route path={ROUTES?.MOVIES} component={MoviesWrapper} />
    <Route path={ROUTES?.MAIN} exact component={DashboardWrapper} />
    <Route path={ROUTES?.SAMPLE} component={SampleWrapper} />
    <Route path={ROUTES?.PROFILE} component={ProfileWrapper} />
    <Route path="*" exact component={Error404} />
  </Switch>
);

export default ContentRoutes;
