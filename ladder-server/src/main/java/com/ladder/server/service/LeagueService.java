package com.ladder.server.service;

import com.ladder.server.data.LeaderboardEntry;
import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.data.Player;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

@Service
public class LeagueService {
  private final LeagueRepository leagueRepository;

  public LeagueService(LeagueRepository leagueRepository) {
    this.leagueRepository = leagueRepository;
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

  public League handlePlayerAdded(Player player, UUID leagueId) {
    League league = findLeagueById(leagueId);

    league.addPlayer(player);

    return leagueRepository.save(league);
  }

  public League handlePlayerRemoved(Player player, UUID leagueId) {
    League league = findLeagueById(leagueId);
    league.removePlayer(player);
    return leagueRepository.save(league);
  }

  public League handleLeagueResult(UUID leagueId, UUID winnerId, UUID loserId) {
    var league = findLeagueById(leagueId);
    league.handleLeagueResult(winnerId, loserId);
    return leagueRepository.save(league);
  }
}
