import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '../types';
import {
  LeagueActionType,
  setActiveLeagueAction,
  setAvailableLeaguesAction,
} from './actions';
import { getLeaguesRequest } from './api';

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

export const leagueEpics = combineEpics(loadLeagueEpic, setInitialLeague);
