import { Player } from './player';

export interface League {
  id: string;
  name: string;
  leaderboard: Map<String, LeaderboardEntry>
}

export interface LeaderboardEntry {
  rank: number | null;
  player: Player;
}