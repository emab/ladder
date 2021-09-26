import { League } from '../../types';

export enum LeagueActionType {
  SET_ACTIVE_LEAGUE = 'SET_ACTIVE_LEAGUE',
  GET_LEAGUE = 'GET_LEAGUE',
  FETCH_LEAGUES = 'FETCH_LEAGUES',
  SET_AVAILABLE_LEAGUES = 'SET_AVAILABLE_LEAGUES',
  SUBMIT_LEAGUE_RESULT = 'SUBMIT_LEAGUE_RESULT',
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

export const setActiveLeagueAction = (
  leagueId: string
): SetActiveLeagueAction => ({
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

export interface SubmitLeagueResultAction {
  type: LeagueActionType.SUBMIT_LEAGUE_RESULT;
  leagueId: string;
  winnerId: string;
  loserId: string;
}

export const submitLeagueResultAction = (
  leagueId: string,
  winnerId: string,
  loserId: string
): SubmitLeagueResultAction => ({
  type: LeagueActionType.SUBMIT_LEAGUE_RESULT,
  leagueId,
  winnerId,
  loserId,
});

export type LeagueAction =
  | GetLeagueAction
  | SetActiveLeagueAction
  | FetchLeaguesAction
  | SetAvailableLeaguesAction
  | SubmitLeagueResultAction;
