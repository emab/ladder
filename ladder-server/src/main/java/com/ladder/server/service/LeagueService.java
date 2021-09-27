package com.ladder.server.service;

import com.ladder.server.data.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

@Service
public class LeagueService {
  private final LeagueRepository leagueRepository;
  private final PlayerRepository playerRepository;

  public LeagueService(LeagueRepository leagueRepository, PlayerRepository playerRepository) {
    this.leagueRepository = leagueRepository;
    this.playerRepository = playerRepository;
  }

  private League findLeagueById(UUID leagueId) throws RuntimeException {
    if (leagueId == null) {
      // TODO better exception, handle in controller layer with nice response
      throw new RuntimeException("leagueId cannot be null");
    }
    return leagueRepository
        .findById(leagueId)
        .orElseThrow(() -> new RuntimeException("league not found"));
  }

  private Player findPlayerById(UUID playerId) throws RuntimeException {
    if (playerId == null) {
      throw new RuntimeException("playerId cannot be null");
    }
    return playerRepository
        .findById(playerId)
        .orElseThrow(() -> new RuntimeException("player not found"));
  }

  public League handlePlayerAdded(UUID leagueId, UUID playerId) {
    League league = findLeagueById(leagueId);
    Player player = findPlayerById(playerId);
    league.addPlayer(player);

    return leagueRepository.save(league);
  }

  public League handlePlayerRemoved(UUID leagueId, UUID playerId) {
    League league = findLeagueById(leagueId);
    Player player = findPlayerById(playerId);
    league.removePlayer(player);

    return leagueRepository.save(league);
  }

  public League handleLeagueResult(UUID leagueId, UUID winnerID, UUID loserId) {
    League league = findLeagueById(leagueId);
    Player winner = findPlayerById(winnerID);
    Player loser = findPlayerById(loserId);
    league.handleLeagueResult(winner, loser);

    return leagueRepository.save(league);
  }
}
