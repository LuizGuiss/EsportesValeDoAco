import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import QuadrasMap from './pages/QuadrasMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={QuadrasMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;