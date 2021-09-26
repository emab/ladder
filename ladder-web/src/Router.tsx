import React, { ReactChild } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditPlayer, League, PlayerList } from './components';

interface IRouterProps {
  children: ReactChild;
}

export function Router({ children }: IRouterProps) {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route exact path="/">
          <League />
        </Route>
        <Route path="/players/:playerId" component={EditPlayer} />
        <Route path="/players">
          <PlayerList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
