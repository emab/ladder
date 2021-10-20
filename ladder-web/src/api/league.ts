import { PlayerId } from '../types';

interface AddLeagueRequest {
  name: string;
}

export const createAddLeagueRequest = (name: string): AddLeagueRequest => ({
  name
})

interface UpdateLeagueNameRequest {
  name: string;
}

export const createUpdateLeagueNameRequest = (name: string): UpdateLeagueNameRequest => ({
  name
})

interface CreateChallengeRequest {
  challengerId: PlayerId;
  challengedId: PlayerId;
}

export const createChallengeRequest = (challengerId: PlayerId, challengedId: PlayerId): CreateChallengeRequest => ({
  challengerId,
  challengedId
})

interface ChallengeResultRequest {
  winnerId: PlayerId;
}

export const createChallengeResultRequest = (winnerId: PlayerId): ChallengeResultRequest => ({
  winnerId
})