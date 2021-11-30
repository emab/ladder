import { PlayerId } from './player';

// TODO challenges not implemented on frontend
export type ChallengeId = string;

export interface Challenge {
  challengeId: ChallengeId;
  challenger: PlayerId;
  challenged: PlayerId;
  result: ChallengeResult;
  state: ChallengeState;
}

export enum ChallengeState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface ChallengeResult {
  draw: boolean;
  winner: PlayerId;
  loser: PlayerId;
}
