import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { League } from '../../types';

export const getLeaguesRequest = (): Observable<Array<League>> =>
  ajax.getJSON('http://localhost:8080/league');
