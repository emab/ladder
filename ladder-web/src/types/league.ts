import { Player } from './player';

export interface League {
  id: string;
  name: string;
  leaderboard: Array<LeaderboardEntry>
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
}