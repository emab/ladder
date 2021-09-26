import { Player } from '../../types';

export enum PlayersActionType {
  ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST',
  ADD_PLAYER = 'ADD_PLAYER',
  FETCH_PLAYERS = 'FETCH_PLAYERS',
  SET_PLAYERS = 'SET_PLAYERS',
  ADD_PLAYER_LEAGUE = 'ADD_PLAYER_LEAGUE',
  REMOVE_PLAYER_LEAGUE = 'REMOVE_PLAYER_LEAGUE',
  DELETE_PLAYER = 'DELETE_PLAYER'
}

export interface AddPlayerRequestAction {
  type: PlayersActionType.ADD_PLAYER_REQUEST;
  username: string;
}

export const addPlayerRequestAction = (
  username: string
): AddPlayerRequestAction => ({
  type: PlayersActionType.ADD_PLAYER_REQUEST,
  username,
});

export interface AddPlayerAction {
  type: PlayersActionType.ADD_PLAYER;
  player: Player;
}

export const addPlayerAction = (player: Player): AddPlayerAction => ({
  type: PlayersActionType.ADD_PLAYER,
  player,
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

export interface AddPlayerLeagueAction {
  type: PlayersActionType.ADD_PLAYER_LEAGUE;
  playerId: string;
  leagueId: string;
}

export const addPlayerLeagueAction = (
  playerId: string,
  leagueId: string
): AddPlayerLeagueAction => ({
  type: PlayersActionType.ADD_PLAYER_LEAGUE,
  playerId,
  leagueId,
});

export interface RemovePlayerLeagueAction {
  type: PlayersActionType.REMOVE_PLAYER_LEAGUE;
  playerId: string;
  leagueId: string;
}

export const removePlayerLeagueAction = (
  playerId: string,
  leagueId: string
): RemovePlayerLeagueAction => ({
  type: PlayersActionType.REMOVE_PLAYER_LEAGUE,
  playerId,
  leagueId,
});

export interface DeletePlayerAction {
  type: PlayersActionType.DELETE_PLAYER
  playerId: string;
}

export const deletePlayerAction = (playerId: string): DeletePlayerAction => ({
  type: PlayersActionType.DELETE_PLAYER,
  playerId
})

export type PlayersAction =
  | SetPlayersAction
  | FetchPlayersAction
  | AddPlayerRequestAction
  | AddPlayerAction
  | AddPlayerLeagueAction
  | RemovePlayerLeagueAction
  | DeletePlayerAction;
