import { combineReducers, createStore } from 'redux';
import { playersReducer } from './players';
import { State } from './types';

const rootReducer = combineReducers<State>({ players: playersReducer });

export default createStore(rootReducer);
