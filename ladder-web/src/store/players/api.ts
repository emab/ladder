import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Player, UpdateType } from '../../types';

export const getPlayersRequest = (): Observable<Array<Player>> =>
  ajax.getJSON('http://localhost:8080/player');

export const addPlayerRequest = (
  username: string
): Observable<AjaxResponse<Player>> =>
  ajax.post('http://localhost:8080/player', { username });

export const updatePlayerLeaguesRequest = (
  playerId: string,
  leagueId: string,
  updateType: UpdateType
): Observable<AjaxResponse<Player>> =>
  ajax.post(`http://localhost:8080/player/${playerId}/league`, {
    leagueId,
    updateType,
  });

export const deletePlayerRequest = (playerId: string) =>
  ajax.delete(`http://localhost:8080/player/${playerId}`);
