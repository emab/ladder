import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { State } from './types';
import { appEpics } from './epics';
import { catchError } from 'rxjs/operators';
import { playerEpics } from './player/epics';
import { leagueEpics } from './leagues/epics';
import { playerReducer } from './player/reducer';
import { leagueReducer } from './leagues/reducer';
import { authenticationReducer } from './authentication/reducer';

const logger = createLogger();

const epicMiddleware = createEpicMiddleware();

const epics = combineEpics(appEpics, playerEpics, leagueEpics);

const rootEpic: Epic = (action$, store$, dependencies) =>
  epics(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

const rootReducer = combineReducers<State>({
  authentication: authenticationReducer,
  player: playerReducer,
  league: leagueReducer,
});

export default createStore(
  rootReducer,
  applyMiddleware(epicMiddleware, logger)
);

epicMiddleware.run((action$, store) => rootEpic(action$, store, {}));
