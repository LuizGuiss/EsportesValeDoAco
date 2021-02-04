import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import QuadrasMap from './pages/QuadrasMap';
import Quadra from './pages/Quadra';
import CreateQuadra from './pages/CreateQuadra';

function Routes() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={QuadrasMap} />

        <Route path="/quadras/create" component={CreateQuadra} />
        <Route path="/quadras/:id" component={Quadra} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;