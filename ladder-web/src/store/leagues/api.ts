import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { League } from '../../types';

export const getLeaguesRequest = (): Observable<Array<League>> =>
  ajax.getJSON('http://localhost:8080/league');

export const submitLeagueResultRequest = (
  leagueId: string,
  winnerId: string,
  loserId: string
): Observable<AjaxResponse<unknown>> =>
  ajax.post(`http://localhost:8080/league/${leagueId}/result`, {
    winnerId,
    loserId,
  });
