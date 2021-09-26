import { League, Player } from '../types';
import { LeagueAction } from './leagues';
import { PlayersAction } from './players';

export interface PlayersState {
  players: { [id: string]: Player };
}

export interface LeagueState {
  selectedLeague: string | undefined;
  availableLeagues: {
    [id: string]: League;
  };
}

export interface State {
  players: PlayersState;
  league: LeagueState;
}

export type Action = PlayersAction | LeagueAction;
