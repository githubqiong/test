import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { routerRedux  } from 'dva';
import HomeContainer from '../pages/home';
import BroadcastContainer from '../pages/list';
import { history } from '../dvaCon';

const { ConnectedRouter } = routerRedux;
const routes = (
  <ConnectedRouter history={history}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/broadcast" component={BroadcastContainer} />
      </Switch>
    </Router>
  </ConnectedRouter>
);
export default routes;
