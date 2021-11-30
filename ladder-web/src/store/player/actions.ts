import { LeagueId } from '../../types';

export enum PlayerActionType {
  UPDATE_PLAYER_LEAGUES = 'UPDATE_PLAYER_LEAGUES',
  ADD_PLAYER_LEAGUE = 'ADD_PLAYER_LEAGUE',
  REMOVE_PLAYER_LEAGUE = 'REMOVE_PLAYER_LEAGUE',
}

export interface UpdatePlayerLeaguesAction {
  type: PlayerActionType.UPDATE_PLAYER_LEAGUES;
  leagueIds: LeagueId[];
}

export const updatePlayerLeaguesAction = (
  leagueIds: LeagueId[]
): UpdatePlayerLeaguesAction => ({
  type: PlayerActionType.UPDATE_PLAYER_LEAGUES,
  leagueIds,
});

export interface AddPlayerLeagueAction {
  type: PlayerActionType.ADD_PLAYER_LEAGUE;
  leagueId: LeagueId;
}

export const addPlayerLeagueAction = (
  leagueId: LeagueId
): AddPlayerLeagueAction => ({
  type: PlayerActionType.ADD_PLAYER_LEAGUE,
  leagueId,
});

export interface RemovePlayerLeagueAction {
  type: PlayerActionType.REMOVE_PLAYER_LEAGUE;
  leagueId: LeagueId;
}

export const removePlayerLeagueAction = (
  leagueId: LeagueId
): RemovePlayerLeagueAction => ({
  type: PlayerActionType.REMOVE_PLAYER_LEAGUE,
  leagueId,
});

export type PlayerAction =
  | UpdatePlayerLeaguesAction
  | AddPlayerLeagueAction
  | RemovePlayerLeagueAction;
