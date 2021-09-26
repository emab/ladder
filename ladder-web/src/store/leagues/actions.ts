import { League } from '../../types';

export enum LeagueActionType {
  SET_ACTIVE_LEAGUE = 'SET_ACTIVE_LEAGUE',
  GET_LEAGUE = 'GET_LEAGUE',
  FETCH_LEAGUES = 'FETCH_LEAGUES',
  SET_AVAILABLE_LEAGUES = 'SET_AVAILABLE_LEAGUES',
}

export interface GetLeagueAction {
  type: LeagueActionType.GET_LEAGUE;
}

export const getLeagueAction = (): GetLeagueAction => ({
  type: LeagueActionType.GET_LEAGUE,
});

export interface SetActiveLeagueAction {
  type: LeagueActionType.SET_ACTIVE_LEAGUE;
  leagueId: string;
}

export const setActiveLeagueAction = (leagueId: string): SetActiveLeagueAction => ({
  type: LeagueActionType.SET_ACTIVE_LEAGUE,
  leagueId,
});

export interface FetchLeaguesAction {
  type: LeagueActionType.FETCH_LEAGUES;
}

export const fetchLeaguesAction = (): FetchLeaguesAction => ({
  type: LeagueActionType.FETCH_LEAGUES,
});

export interface SetAvailableLeaguesAction {
  type: LeagueActionType.SET_AVAILABLE_LEAGUES;
  leagues: Array<League>;
}

export const setAvailableLeaguesAction = (
  leagues: Array<League>
): SetAvailableLeaguesAction => ({
  type: LeagueActionType.SET_AVAILABLE_LEAGUES,
  leagues,
});

export type LeagueAction =
  | GetLeagueAction
  | SetActiveLeagueAction
  | FetchLeaguesAction
  | SetAvailableLeaguesAction;
