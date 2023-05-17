import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../common/constants';
import Sample from './Sample';

const SampleWrapper = () => (
  <Switch>
    <Route path={ROUTES?.SAMPLE} exact component={Sample} />
  </Switch>
);
export default SampleWrapper;
