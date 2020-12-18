import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Play, Contribute } from './components';
const Routes = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === '/') {
      history.push('/play');
    }
  });
  return (
    <Switch>
      <Route exact path="/play" component={Play}></Route>
      <Route exact path="/contribute" component={Contribute}></Route>
    </Switch>
  );
};

export default Routes;
