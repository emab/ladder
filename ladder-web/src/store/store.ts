import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { leagueEpics, leagueReducer } from './leagues';
import { playersReducer } from './players';
import { playersEpics } from './players/epics';
import { State } from './types';

const logger = createLogger();

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(playersEpics, leagueEpics);

const rootReducer = combineReducers<State>({
  players: playersReducer,
  league: leagueReducer,
});

export default createStore(
  rootReducer,
  applyMiddleware(epicMiddleware, logger)
);

epicMiddleware.run(rootEpic);
