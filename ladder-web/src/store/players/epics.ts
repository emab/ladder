import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { PlayersActionType, setPlayersAction } from './actions';
import { getPlayers } from './api';

export const loadPlayersEpic: Epic = (action$) =>
  action$.pipe(
    ofType(PlayersActionType.FETCH_PLAYERS),
    switchMap(() => getPlayers()),
    map((players) => setPlayersAction(players))
  );

export const playersEpics = combineEpics(loadPlayersEpic);
