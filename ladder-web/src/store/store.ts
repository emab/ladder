import { combineReducers, createStore } from 'redux';
import { playersReducer } from './players';

const rootReducer = combineReducers({ players: playersReducer });

export default createStore(rootReducer);