package com.ladder.server.service;

import com.ladder.server.data.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueService {
  private final LeagueRepository leagueRepository;
  private final PlayerRepository playerRepository;
  private final LeaderboardService leaderboardService;

  public LeagueService(
      LeagueRepository leagueRepository,
      PlayerRepository playerRepository,
      LeaderboardService leaderboardService) {
    this.leagueRepository = leagueRepository;
    this.playerRepository = playerRepository;
    this.leaderboardService = leaderboardService;
  }

  private League findLeagueById(Integer leagueId) throws RuntimeException {
    if (leagueId == null) {
      // TODO better exception, handle in controller layer with nice response
      throw new RuntimeException("leagueId cannot be null");
    }
    return leagueRepository
        .findById(leagueId)
        .orElseThrow(() -> new RuntimeException("league not found"));
  }

  private Player findPlayerById(Integer playerId) throws RuntimeException {
    if (playerId == null) {
      throw new RuntimeException("playerId cannot be null");
    }
    return playerRepository
        .findById(playerId)
        .orElseThrow(() -> new RuntimeException("player not found"));
  }

  public List<League> getLeagues() {
    return leagueRepository.findAll();
  }

  public League getLeague(Integer leagueId) {
    return findLeagueById(leagueId);
  }

  public League addLeague(String name) {
    return leagueRepository.save(new League(name));
  }

  public List<Challenge> getLeagueChallenges(Integer leagueId) {
    return getLeague(leagueId).getChallenges();
  }

  public League updateLeagueName(Integer leagueId, String name) {
    League league = findLeagueById(leagueId);
    league.updateLeagueName(name);

    return leagueRepository.save(league);
  }

  public League handlePlayerAdded(Integer leagueId, Integer playerId) {
    League league = findLeagueById(leagueId);
    Player player = findPlayerById(playerId);
    league.addPlayer(player);

    return leagueRepository.save(league);
  }

  public League handlePlayerRemoved(Integer leagueId, Integer playerId) {
    League league = findLeagueById(leagueId);
    Player player = findPlayerById(playerId);
    league.removePlayer(player);

    return leagueRepository.save(league);
  }

  public League addChallenge(Integer leagueId, Integer challengerId, Integer challengedId) {
    League league = findLeagueById(leagueId);
    Player challenger = findPlayerById(challengerId);
    Player challenged = findPlayerById(challengedId);
    league.addChallenge(challenger, challenged);

    return leagueRepository.save(league);
  }

  public League handleChallengeResult(Integer leagueId, Integer challengeId, Integer winnerId) {
    League league = findLeagueById(leagueId);
    Player winner = findPlayerById(winnerId);
    var challenge = league.handleChallengeResult(challengeId, winner);
    leaderboardService.handleChallengeResult(
        league.getLeaderboard().getLeaderboardId(),
        challenge.getWinner().getPlayerId(),
        challenge.getLoser().getPlayerId());
    return leagueRepository.save(league);
  }
}
