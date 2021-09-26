import { createSelector } from 'reselect';
import { PlayersState, State } from '../types';

export const playersSelector = (state: State): PlayersState => state.players;

export const playerByIdSelector = (userId: string) =>
  createSelector(playersSelector, ({ players }) => players[userId]);

export const playersArraySelector = createSelector(
  playersSelector,
  ({ players }) => Object.values(players)
);
