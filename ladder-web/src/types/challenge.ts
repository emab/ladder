import { Player } from './player';

export type ChallengeId = number;

export interface Challenge {
  challengeId: ChallengeId;
  challenger: Player;
  challenged: Player;
  winner: Player | null;
  loser: Player | null;
  state: ChallengeState;
}

export enum ChallengeState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}