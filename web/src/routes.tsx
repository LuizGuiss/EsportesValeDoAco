import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import QuadrasMap from './pages/QuadrasMap';
import Quadra from './pages/Quadra';
import CreateQuadra from './pages/CreateQuadra';
import NotAuthRoute from './utils/NotAuthRoute';
import Login from './pages/Login';
import AuthRoute from './utils/AuthRoute';
import QuadrasRegistered from './pages/Dashboard/QuadrasRegistered';
import QuadrasPending from './pages/Dashboard/QuadrasPending';
import QuadrasEdit from './pages/Dashboard/QuadraEdit';
import QuadraPending from './pages/Dashboard/QuadraPending';
import QuadraDelete from './pages/Dashboard/QuadraDelete';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* parte relacionada ao app em si */}
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={QuadrasMap} />
        <Route path="/quadras/create" component={CreateQuadra} />
        <Route path="/quadras/:id" component={Quadra} />

        {/* Está incompleto ainda, preciso de acrescentar parte relacionada a login */}
        <NotAuthRoute path="/login" component={Login} />
        <NotAuthRoute path="/forget-password" component={ForgetPassword} />
        <NotAuthRoute path="/reset-password/:id" component={ResetPassword} />

        {/* parte relacionada ao dashboard do admin */}
        <AuthRoute path="/dashboard/quadras-registered" exact component={QuadrasRegistered} />
        <AuthRoute path="/dashboard/quadras-pending" exact component={QuadrasPending} />
        <AuthRoute path="/dashboard/quadras-registered/edit/:id" component={QuadrasEdit} />
        <AuthRoute path="/dashboard/quadras-pending/:id" component={QuadraPending} />
        <AuthRoute path="/dashboard/quadras-registered/delete/:id" component={QuadraDelete} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;