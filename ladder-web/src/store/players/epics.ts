import { combineEpics, Epic, ofType } from 'redux-observable';
import { ignoreElements, map, mergeMap, switchMap } from 'rxjs/operators';
import { UpdateType } from '../../types';
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
  updatePlayerLeaguesRequest,
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

export const updatePlayerLeaguesEpic: Epic = (action$) =>
  action$.pipe(
    ofType<
      Action,
      | PlayersActionType.ADD_PLAYER_LEAGUE
      | PlayersActionType.REMOVE_PLAYER_LEAGUE
    >(
      PlayersActionType.ADD_PLAYER_LEAGUE,
      PlayersActionType.REMOVE_PLAYER_LEAGUE
    ),
    mergeMap(({ playerId, leagueId, type }) =>
      updatePlayerLeaguesRequest(
        playerId,
        leagueId,
        type === PlayersActionType.ADD_PLAYER_LEAGUE
          ? UpdateType.ADD
          : UpdateType.REMOVE
      )
    ),
    ignoreElements()
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
  updatePlayerLeaguesEpic,
  deletePlayerEpic
);
