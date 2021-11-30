import { combineEpics, Epic, ofType } from 'redux-observable';
import { PlayerActionType, updatePlayerLeaguesAction } from './actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { authenticationUserIdSelector } from '../authentication';
import { authenticatedAjax } from '../../util/authenticatedAjax';
import {
  addPlayerLeagueRequest,
  getPlayerLeaguesRequest,
  removePlayerLeagueRequest,
} from './api';
import { Action } from '../types';
import { AppActionType } from '../appActions';
import { fetchLeaguesAction } from '../leagues';

const addPlayerLeagueEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType<Action, PlayerActionType.ADD_PLAYER_LEAGUE>(
      PlayerActionType.ADD_PLAYER_LEAGUE
    ),
    switchMap(({ leagueId }) =>
      state$.pipe(
        authenticatedAjax(
          addPlayerLeagueRequest(
            authenticationUserIdSelector(state$.value),
            leagueId
          )
        )
      )
    ),
    mergeMap((leagues) => [
      updatePlayerLeaguesAction(leagues),
      fetchLeaguesAction(),
    ])
  );

const removePlayerLeagueEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType<Action, PlayerActionType.REMOVE_PLAYER_LEAGUE>(
      PlayerActionType.REMOVE_PLAYER_LEAGUE
    ),
    switchMap(({ leagueId }) =>
      state$.pipe(
        authenticatedAjax(
          removePlayerLeagueRequest(
            authenticationUserIdSelector(state$.value),
            leagueId
          )
        )
      )
    ),
    mergeMap((leagues) => [
      updatePlayerLeaguesAction(leagues),
      fetchLeaguesAction(),
    ])
  );

const getPlayerLeaguesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType<Action, AppActionType.FETCH_DATA_START>(
      AppActionType.FETCH_DATA_START
    ),
    switchMap(() =>
      state$.pipe(
        authenticatedAjax(
          getPlayerLeaguesRequest(authenticationUserIdSelector(state$.value))
        )
      )
    ),
    map((leagues) => updatePlayerLeaguesAction(leagues))
  );
export const playerEpics = combineEpics(
  addPlayerLeagueEpic,
  getPlayerLeaguesEpic,
  removePlayerLeagueEpic
);
