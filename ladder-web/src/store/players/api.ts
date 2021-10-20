import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { endpoints } from '../../api/endpoints';
import { Player, PlayerId } from '../../types';

export const getPlayersRequest = (): Observable<Array<Player>> =>
  ajax.getJSON(endpoints.player.getPlayers);

export const addPlayerRequest = (
  username: string
): Observable<AjaxResponse<Player>> =>
  ajax.post(endpoints.player.addPlayer, { username });

export const deletePlayerRequest = (playerId: PlayerId) =>
  ajax.delete(endpoints.player.deletePlayer(playerId));

export const getPlayerChallenges = (playerId: PlayerId) =>
  ajax.getJSON(endpoints.player.getPlayerChallenges(playerId));
