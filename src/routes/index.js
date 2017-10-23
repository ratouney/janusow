import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SelectUser } from '../modules/SelectUser';

const PageRouter = function PageRouter() {
  return (
    <Switch>
      <Route path="/select" exact component={SelectUser} />
    </Switch>
  );
};

export default PageRouter;
