package com.ladder.server.service;

import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlayerService {
  public final LeagueService leagueService;
  public final LeagueRepository leagueRepository;

  public PlayerService(LeagueService leagueService, LeagueRepository leagueRepository) {
    this.leagueService = leagueService;
    this.leagueRepository = leagueRepository;
  }

  public Set<String> getPlayerLeagues(String playerId) {
    return leagueRepository.findAllByPlayersContains(playerId).stream()
        .map(League::getId)
        .collect(Collectors.toSet());
  }

  public Set<String> handlePlayerAdded(String playerId, String leagueId) {
    leagueService.handlePlayerAdded(leagueId, playerId);

    return leagueRepository.findAllByPlayersContains(playerId).stream().map(League::getId).collect(Collectors.toSet());
  }

  public Set<String> handlePlayerRemoved(String playerId, String leagueId) {
    leagueService.handlePlayerRemoved(leagueId, playerId);

    return leagueRepository.findAllByPlayersContains(playerId).stream().map(League::getId).collect(Collectors.toSet());
  }
}
