import { State } from '../types';
import { createSelector } from 'reselect';

const playerSelector = (state: State) => state.player;

export const playerLeagueSelector = createSelector(
  playerSelector,
  (player) => player.leagues
);
