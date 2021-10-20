import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { endpoints } from '../../api/endpoints';
import {
  createAddLeagueRequest,
  createChallengeRequest,
  createChallengeResultRequest,
  createUpdateLeagueNameRequest,
} from '../../api/league';
import {
  ChallengeId,
  League, LeagueId, PlayerId,
} from '../../types';

export const getLeaguesRequest = (): Observable<Array<League>> =>
  ajax.getJSON(endpoints.league.getLeagues);

export const addLeagueRequest = (name: string) =>
  ajax.post<League>(endpoints.league.addLeague, createAddLeagueRequest(name));

export const getLeagueRequest = (leagueId: LeagueId) =>
  ajax.getJSON(endpoints.league.getLeague(leagueId));

export const updateLeagueNameRequest = (leagueId: LeagueId, name: string) =>
  ajax.post<League>(
    endpoints.league.updateLeagueName(leagueId),
    createUpdateLeagueNameRequest(name)
  );

export const addLeagueChallengeRequest = (
  leagueId: LeagueId,
  challengerId: PlayerId,
  challengedId: PlayerId
) =>
  ajax.post<League>(
    endpoints.league.addLeagueChallenge(leagueId),
    createChallengeRequest(challengerId, challengedId)
  );

export const handleLeagueChallengeResultRequest = (
  leagueId: LeagueId,
  challengeId: ChallengeId,
  winnerId: PlayerId
) =>
  ajax.post<League>(
    endpoints.league.handleLeagueChallengeResult(leagueId, challengeId),
    createChallengeResultRequest(winnerId)
  );

export const addLeaguePlayerRequest = (leagueId: LeagueId, playerId: PlayerId) =>
  ajax.post<League>(endpoints.league.addLeaguePlayer(leagueId, playerId));

export const removeLeaguePlayerRequest = (leagueId: LeagueId, playerId: PlayerId) =>
  ajax.delete<League>(endpoints.league.removeLeaguePlayer(leagueId, playerId));
