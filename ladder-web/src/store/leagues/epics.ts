import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { LeagueActionType, setAvailableLeaguesAction } from './actions';
import { AppActionType } from '../appActions';
import { Action } from '../types';
import { authenticatedAjax } from '../../util/authenticatedAjax';
import { getLeaguesRequest } from './api';

export const getLeaguesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType<
      Action,
      LeagueActionType.FETCH_LEAGUES | AppActionType.FETCH_DATA_START
    >(LeagueActionType.FETCH_LEAGUES, AppActionType.FETCH_DATA_START),
    switchMap(() => state$.pipe(authenticatedAjax(getLeaguesRequest))),
    map((leagues) => setAvailableLeaguesAction(leagues))
  );

export const leagueEpics = combineEpics(getLeaguesEpic);
