import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { App, Play, Contribute } from './components';
import { useSelector, useDispatch } from 'react-redux';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/play" />
      </Route>
      <Route exact path="/play" component={Play}></Route>
      <Route exact path="/contribute" component={Contribute}></Route>
    </Switch>
  );
};

export default Routes;
