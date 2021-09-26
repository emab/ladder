import { Player } from '../../types';

export enum PlayersActionType {
  ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST',
  ADD_PLAYER = 'ADD_PLAYER',
  FETCH_PLAYERS = 'FETCH_PLAYERS',
  SET_PLAYERS = 'SET_PLAYERS',
}

export interface AddPlayerRequestAction {
  type: PlayersActionType.ADD_PLAYER_REQUEST;
  username: string;
}

export const addPlayerRequestAction = (username: string): AddPlayerRequestAction => ({
  type: PlayersActionType.ADD_PLAYER_REQUEST,
  username
});

export interface AddPlayerAction {
  type: PlayersActionType.ADD_PLAYER;
  player: Player;
}

export const addPlayerAction = (player: Player): AddPlayerAction => ({
  type: PlayersActionType.ADD_PLAYER,
  player
});

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

export type PlayersAction = SetPlayersAction | FetchPlayersAction | AddPlayerRequestAction | AddPlayerAction;
