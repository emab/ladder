import React, { ReactChild } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditUser } from './EditUser';
import { League } from './League';
import { PlayerList } from './PlayerList';

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
        <Route path="/players/:userId" component={EditUser} />
        <Route path="/players">
          <PlayerList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
