import { createSelector } from 'reselect';
import { playerLeagueSelector } from '../../store/player';
import { availableLeaguesArraySelector } from '../../store/leagues';
import { League } from '../../types';

interface DashboardLeagueSelectorResult {
  playerLeagues: League[];
  availableLeagues: League[];
}

export const dashboardLeagueSelector = createSelector(
  [playerLeagueSelector, availableLeaguesArraySelector],
  (playerLeagueIds, availableLeagues) =>
    availableLeagues.reduce<DashboardLeagueSelectorResult>(
      (acc, league) => {
        if (playerLeagueIds.includes(league.leagueId)) {
          acc.playerLeagues.push(league);
        } else {
          acc.availableLeagues.push(league);
        }
        return acc;
      },
      {
        playerLeagues: [],
        availableLeagues: [],
      }
    )
);
