import { LeagueAction } from './leagues';
import { AuthenticationAction } from './authentication';
import { AppAction } from './appActions';
import { PlayerAction } from './player';
import { League, LeagueId } from '../types';

export type UserId = string;

export interface User {
  id: UserId;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  token: string;
}

export interface PlayerState {
  leagues: LeagueId[];
}

export interface LeagueState {
  selectedLeague: string | undefined;
  availableLeagues: {
    [id: string]: League;
  };
}

export interface State {
  authentication: AuthState;
  player: PlayerState;
  league: LeagueState;
}

export type Action =
  | PlayerAction
  | LeagueAction
  | AuthenticationAction
  | AppAction;
