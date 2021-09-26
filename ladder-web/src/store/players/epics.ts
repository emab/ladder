import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  addPlayerAction,
  PlayersActionType,
  setPlayersAction,
} from './actions';
import { addPlayerRequest, getPlayersRequest } from './api';

export const loadPlayersEpic: Epic = (action$) =>
  action$.pipe(
    ofType(PlayersActionType.FETCH_PLAYERS),
    switchMap(() => getPlayersRequest()),
    map((players) => setPlayersAction(players))
  );

export const addPlayerEpic: Epic = (action$) =>
  action$.pipe(
    ofType(PlayersActionType.ADD_PLAYER_REQUEST),
    mergeMap(({ username }) => addPlayerRequest(username)),
    map((request) => addPlayerAction(request.response))
  );

export const playersEpics = combineEpics(loadPlayersEpic, addPlayerEpic);
