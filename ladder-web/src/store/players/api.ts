import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Player } from '../../types';

export const getPlayersRequest = (): Observable<Array<Player>> =>
  ajax.getJSON('http://localhost:8080/player');

export const addPlayerRequest = (
  username: string
): Observable<AjaxResponse<Player>> =>
  ajax.post('http://localhost:8080/player', { username });
