import { PlayerId } from './player';

export type LeaderboardId = number;

export interface Leaderboard {
  leaderboardId: LeaderboardId;
  leaderboard: { [playerId: PlayerId]: number };
}
