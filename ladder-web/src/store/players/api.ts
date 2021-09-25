import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { Player } from '../../types';

export const getPlayers = (): Observable<Array<Player>> =>
  ajax.getJSON('http://localhost:8080/player');
