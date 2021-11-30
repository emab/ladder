import { combineEpics, Epic, ofType } from 'redux-observable';
import { AppActionType, fetchDataStart } from './appActions';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { authenticationTokenSelector } from './authentication';
import { first } from 'rxjs';

/**
 * Ensure that a token is available before fetching data.
 *
 * Token is stored in redux state via src/util/useAuthentication.ts
 */
export const fetchDataEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(AppActionType.FETCH_DATA),
    switchMap(() =>
      state$.pipe(
        map(authenticationTokenSelector),
        filter((token): token is string => !!token),
        first(),
        mapTo(fetchDataStart())
      )
    )
  );

export const appEpics = combineEpics(fetchDataEpic);
