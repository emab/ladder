import {  LeagueId, PlayerId } from '../types';
import { ChallengeId } from '../types/challenge';

const BASE_URL = 'localhost:8080';

export const endpoints = {
  player: {
    getPlayers: `${BASE_URL}/player`,
    addPlayer: `${BASE_URL}/player`,
    deletePlayer: (playerId: PlayerId) => `${BASE_URL}/player/${playerId}`,
    getPlayerChallenges: (playerId: PlayerId) => `${BASE_URL}/player/${playerId}/challenge`
  },
  league: {
    getLeagues: `${BASE_URL}/league`,
    addLeague: `${BASE_URL}/league`,
    getLeague: (leagueId: LeagueId) => `${BASE_URL}/league/${leagueId}`,
    updateLeagueName: (leagueId: LeagueId) => `${BASE_URL}/league/${leagueId}`,
    getLeagueChallenges: (leagueId: LeagueId) => `${BASE_URL}/league/${leagueId}/challenge`,
    addLeagueChallenge: (leagueId: LeagueId) => `${BASE_URL}/league/${leagueId}/challenge`,
    handleLeagueChallengeResult: (leagueId: LeagueId, challengeId: ChallengeId) => `${BASE_URL}/league/${leagueId}/challenge/${challengeId}`,
    addLeaguePlayer: (leagueId: LeagueId, playerId: PlayerId) => `${BASE_URL}/league/${leagueId}/player/${playerId}`,
    removeLeaguePlayer: (leagueId: LeagueId, playerId: PlayerId) => `${BASE_URL}/league/${leagueId}/player/${playerId}`,
  }
}

