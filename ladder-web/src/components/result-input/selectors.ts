import { createSelector } from 'reselect';
import { playersArraySelector } from '../../store';
import { selectedLeagueIdSelector } from '../../store/leagues/selectors';

export const leaguePlayerSelector = createSelector(
  [playersArraySelector, selectedLeagueIdSelector],
  (players, selectedLeagueId) => {
    if (!selectedLeagueId) {
      return [];
    }
    return players.filter((player) =>
      player.leagues.includes(selectedLeagueId)
    );
  }
);
