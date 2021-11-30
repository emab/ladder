import { AuthenticatedRequest } from '../../api/authenticatedRequest';
import { LeagueId, PlayerId } from '../../types';
import { endpoints } from '../../api/endpoints';
import { map } from 'rxjs/operators';

export const addPlayerLeagueRequest =
  (playerId: PlayerId, leagueId: LeagueId): AuthenticatedRequest<LeagueId[]> =>
  (ajax) =>
    ajax
      .post<string[]>(endpoints.player.addPlayerLeague(playerId), { leagueId })
      .pipe(map((response) => response.response));

export const removePlayerLeagueRequest =
  (playerId: PlayerId, leagueId: LeagueId): AuthenticatedRequest<LeagueId[]> =>
  (ajax) =>
    ajax
      .delete<string[]>(endpoints.player.removePlayerLeague(playerId, leagueId))
      .pipe(map((response) => response.response));

export const getPlayerLeaguesRequest =
  (playerId: PlayerId): AuthenticatedRequest<LeagueId[]> =>
  (ajax) =>
    ajax
      .get<string[]>(endpoints.player.getLeagues(playerId))
      .pipe(map((response) => response.response));
