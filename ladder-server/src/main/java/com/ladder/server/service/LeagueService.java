package com.ladder.server.service;

import com.ladder.server.controller.response.ChallengeResponse;
import com.ladder.server.controller.response.LeagueResponse;
import com.ladder.server.data.*;
import com.ladder.server.mappers.ChallengeMappers;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LeagueService {
  private final LeagueRepository leagueRepository;
  private final ServiceUtils<League, LeagueRepository> serviceUtils;

  public LeagueService(LeagueRepository leagueRepository) {
    this.leagueRepository = leagueRepository;
    this.serviceUtils = new ServiceUtils<>(leagueRepository);
  }

  public List<League> getLeagues() {
    return leagueRepository.findAll();
  }

  public LeagueResponse getLeague(String leagueId) {
    var league = serviceUtils.findOrThrow(leagueId);
    return LeagueResponse.builder().LeagueId(league.getId()).name(league.getName()).build();
  }

  public League addLeague(String name) {
    return leagueRepository.save(new League(name));
  }

  public List<ChallengeResponse> getLeagueChallenges(String leagueId) {
    var league = serviceUtils.findOrThrow(leagueId);

    return ChallengeMappers.toChallengeResponse(league.getChallenges());
  }

  public LeagueResponse updateLeagueName(String leagueId, String name) {
    var league = serviceUtils.findOrThrow(leagueId);

    league.updateLeagueName(name);
    var savedLeague = leagueRepository.save(league);
    return LeagueResponse.builder()
        .LeagueId(savedLeague.getId())
        .name(savedLeague.getName())
        .build();
  }

  public Set<String> handlePlayerAdded(String leagueId, String playerId) {
    var league = serviceUtils.findOrThrow(leagueId);
    league.addPlayer(playerId);

    return leagueRepository.save(league).getPlayers();
  }

  public Set<String> handlePlayerRemoved(String leagueId, String playerId) {
    var league = serviceUtils.findOrThrow(leagueId);
    league.removePlayer(playerId);

    return leagueRepository.save(league).getPlayers();
  }

  public List<ChallengeResponse> addChallenge(
      String leagueId, String challengerId, String challengedId) {
    var league = serviceUtils.findOrThrow(leagueId);
    league.addChallenge(challengerId, challengedId);

    var savedLeague = leagueRepository.save(league);

    return ChallengeMappers.toChallengeResponse(savedLeague.getChallenges());
  }

  public ChallengeResponse handleChallengeResult(
      String leagueId, String challengeId, String winnerId, String loserId) {
    var league = serviceUtils.findOrThrow(leagueId);
    var challenge = league.handleChallengeResult(challengeId, winnerId, loserId);
    System.out.println(challengeId);
    System.out.println(challenge);
    leagueRepository.save(league);

    return ChallengeMappers.toChallengeResponse(challenge);
  }

  public Set<String> getLeaguePlayers(String leagueId) {
    return serviceUtils.findOrThrow(leagueId).getPlayers();
  }
}
