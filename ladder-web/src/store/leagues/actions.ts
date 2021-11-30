import { League } from '../../types';

export enum LeagueActionType {
  FETCH_LEAGUES = 'FETCH_LEAGUES',
  SET_AVAILABLE_LEAGUES = 'SET_AVAILABLE_LEAGUES',
}

export interface FetchLeaguesAction {
  type: LeagueActionType.FETCH_LEAGUES;
}

export const fetchLeaguesAction = (): FetchLeaguesAction => ({
  type: LeagueActionType.FETCH_LEAGUES,
});

export interface SetAvailableLeaguesAction {
  type: LeagueActionType.SET_AVAILABLE_LEAGUES;
  leagues: League[];
}

export const setAvailableLeaguesAction = (
  leagues: League[]
): SetAvailableLeaguesAction => ({
  type: LeagueActionType.SET_AVAILABLE_LEAGUES,
  leagues,
});

export type LeagueAction = FetchLeaguesAction | SetAvailableLeaguesAction;
