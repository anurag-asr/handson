import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../common/constants';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import MovieDetail from './MovieDetail';
import Movies from './Movies';
import './movies.less';

function MoviesWrapper() {
  return (
    <Switch>
      <Route exact path={ROUTES?.MOVIES} component={Movies} />
      <Route exact path={ROUTES?.ADD_MOVIES} component={AddMovie} />
      <Route exact path={ROUTES?.MOVIE_DETAIL} component={MovieDetail} />
      <Route exact path={ROUTES?.EDIT_MOVIES} component={EditMovie} />
    </Switch>
  );
}

export default MoviesWrapper;
