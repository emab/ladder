import { LeagueId, PlayerId } from '../types';

const BASE_URL = 'http://localhost:8080';

export const endpoints = {
  player: {
    getLeagues: (playerId: PlayerId) => `${BASE_URL}/player/${playerId}/league`,
    addPlayerLeague: (playerId: PlayerId) =>
      `${BASE_URL}/player/${playerId}/league`,
    removePlayerLeague: (playerId: PlayerId, leagueId: LeagueId) =>
      `${BASE_URL}/player/${playerId}/league/${leagueId}`,
  },
  league: {
    getLeagues: `${BASE_URL}/league`,
  },
};
