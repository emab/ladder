// TODO get a list of players from the server - is this still needed, though?

import { LeagueId } from './league';

export type PlayerId = string;

export interface Player {
  playerId: PlayerId;
  username: string;
  leagues: LeagueId[];
  challenged: LeagueId[];
}
