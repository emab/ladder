import { Player, PlayerId } from './player';
import { ChallengeId } from './challenge';

interface LeaderboardEntry {
  playerId: PlayerId;
  score: number;
}

export type Leaderboard = LeaderboardEntry[];

export type LeagueId = string;

export interface League {
  leagueId: LeagueId;
  name: string;
  challenges: ChallengeId[];
  players: Player[];
  leaderboard: Leaderboard;
}
