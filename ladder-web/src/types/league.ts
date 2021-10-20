import { Challenge } from './challenge';
import { Leaderboard } from './leaderboard';
import { Player } from './player';

export type LeagueId = number;

export interface League {
  leagueId: LeagueId;
  name: string;
  challenges: Array<Challenge>
  players: Array<Player>
  leaderboard: Leaderboard;
}