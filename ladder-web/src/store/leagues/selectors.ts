import { createSelector } from 'reselect';
import { LeagueState, State } from '../types';
import { LeagueId } from '../../types';

const leagueSelector = (state: State): LeagueState => state.league;

export const selectedLeagueIdSelector = createSelector(
  leagueSelector,
  (leagueState) => leagueState.selectedLeague
);

export const selectedLeagueSelector = createSelector(
  [leagueSelector, selectedLeagueIdSelector],
  (leagueState, selectedLeagueId) =>
    selectedLeagueId
      ? leagueState.availableLeagues[selectedLeagueId]
      : undefined
);

export const leagueByIdSelector = (leagueId: LeagueId) =>
  createSelector(
    leagueSelector,
    (leagueState) => leagueState.availableLeagues[leagueId]
  );

export const availableLeaguesSelector = createSelector(
  leagueSelector,
  (leagueState) => leagueState.availableLeagues
);

export const availableLeaguesArraySelector = createSelector(
  availableLeaguesSelector,
  (leagues) => Object.values(leagues)
);
