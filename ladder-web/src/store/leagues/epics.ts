import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, mapTo, mergeMap, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '../types';
import {
  fetchLeaguesAction,
  LeagueActionType,
  setActiveLeagueAction,
  setAvailableLeaguesAction,
} from './actions';
import { getLeaguesRequest, submitLeagueResultRequest } from './api';

export const loadLeagueEpic: Epic = (action$) =>
  action$.pipe(
    ofType(LeagueActionType.FETCH_LEAGUES),
    switchMap(() => getLeaguesRequest()),
    map((leagues) => setAvailableLeaguesAction(leagues))
  );

export const setInitialLeague: Epic = (action$) =>
  action$.pipe(
    ofType<Action, LeagueActionType.SET_AVAILABLE_LEAGUES>(
      LeagueActionType.SET_AVAILABLE_LEAGUES
    ),
    map(({ leagues }) => leagues),
    filter((leagues) => !!leagues.length),
    take(1),
    map((leagues) => setActiveLeagueAction(leagues[0].id))
  );

export const submitLeagueResultEpic: Epic = (action$) =>
  action$.pipe(
    ofType<Action, LeagueActionType.SUBMIT_LEAGUE_RESULT>(
      LeagueActionType.SUBMIT_LEAGUE_RESULT
    ),
    mergeMap(({ leagueId, winnerId, loserId }) =>
      submitLeagueResultRequest(leagueId, winnerId, loserId)
    ),
    mapTo(fetchLeaguesAction())
  );

export const leagueEpics = combineEpics(
  loadLeagueEpic,
  setInitialLeague,
  submitLeagueResultEpic
);
