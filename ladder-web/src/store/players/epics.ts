import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from '../types';
import {
  addPlayerAction,
  PlayersActionType,
  setPlayersAction,
} from './actions';
import {
  addPlayerRequest,
  deletePlayerRequest,
  getPlayersRequest,
} from './api';

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
    map((result) => addPlayerAction(result.response))
  );

export const deletePlayerEpic: Epic = (action$) =>
  action$.pipe(
    ofType<Action, PlayersActionType.DELETE_PLAYER>(
      PlayersActionType.DELETE_PLAYER
    ),
    mergeMap(({ playerId }) => deletePlayerRequest(playerId)),
    ignoreElements()
  );

export const playersEpics = combineEpics(
  loadPlayersEpic,
  addPlayerEpic,
  deletePlayerEpic
);
