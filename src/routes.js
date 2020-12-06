import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  App
} from './components';
import { useSelector, useDispatch } from 'react-redux';


const Routes = (props) => {

  return (
    <Switch>
      {/* <Route exact path="/" component={App}></Route> */}
    </Switch>
  );
};

export default Routes;
