import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { playersReducer } from './players';
import { playersEpics } from './players/epics';
import { State } from './types';

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(playersEpics);

const rootReducer = combineReducers<State>({ players: playersReducer });

export default createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);
