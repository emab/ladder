import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, League, Leagues, Profile } from './components';

export function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/league">
        <Leagues />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/league/:leagueId" component={League} />
    </Switch>
  );
}
