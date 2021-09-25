import { createSelector } from 'reselect';
import { PlayersState, State } from '../types';

export const playersSelector = (state: State): PlayersState => state.players;

export const playersArraySelector = createSelector(
  playersSelector,
  ({ players }) => Object.values(players)
);
