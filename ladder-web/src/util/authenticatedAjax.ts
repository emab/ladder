import { first, Observable } from 'rxjs';
import { State } from '../store/types';
import { ajax, AuthenticatedRequest } from '../api/authenticatedRequest';
import { filter, map, switchMap } from 'rxjs/operators';
import { authenticationTokenSelector } from '../store/authentication';

/** An operator function takes an {@link AuthenticatedRequest} to perform an authenticated request within an epic.
 *
 * The below will return an {@link Observable} of the response from the server.
 * Usage: switchMap(() => state$.pipe(authenticatedAjax(getUserRequest)))
 *
 * */
export const authenticatedAjax =
  <S extends State, T>(request: AuthenticatedRequest<T>) =>
  (state$: Observable<S>) =>
    state$.pipe(
      map(authenticationTokenSelector),
      filter((token): token is string => !!token),
      first(),
      switchMap((token) => request(ajax(token)))
    );
