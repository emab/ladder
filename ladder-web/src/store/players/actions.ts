import { Player } from '../../types';

export enum PlayersActionType {
  FETCH_PLAYERS = 'FETCH_PLAYERS',
  SET_PLAYERS = 'SET_PLAYERS',
}

export interface FetchPlayersAction {
  type: PlayersActionType.FETCH_PLAYERS;
}

export const fetchPlayersAction = (): FetchPlayersAction => ({
  type: PlayersActionType.FETCH_PLAYERS,
});

export interface SetPlayersAction {
  type: PlayersActionType.SET_PLAYERS;
  players: Array<Player>;
}

export const setPlayersAction = (players: Array<Player>): SetPlayersAction => ({
  type: PlayersActionType.SET_PLAYERS,
  players,
});

export type PlayersAction = SetPlayersAction | FetchPlayersAction;
