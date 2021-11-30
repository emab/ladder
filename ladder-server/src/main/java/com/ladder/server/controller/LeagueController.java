package com.ladder.server.controller;

import com.ladder.server.controller.response.ChallengeResponse;
import com.ladder.server.controller.response.LeagueResponse;
import com.ladder.server.data.League;
import com.ladder.server.mappers.LeagueMappers;
import com.ladder.server.controller.request.AddLeagueRequest;
import com.ladder.server.controller.request.ChallengeResultRequest;
import com.ladder.server.controller.request.CreateChallengeRequest;
import com.ladder.server.service.LeagueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/league")
public class LeagueController {

  private final LeagueService leagueService;

  public LeagueController(LeagueService leagueService) {
    this.leagueService = leagueService;
  }

  @GetMapping
  public List<LeagueResponse> getLeagues() {
    return leagueService.getLeagues().stream().map(LeagueMappers::toLeagueResponse).collect(Collectors.toList());
  }

  @PostMapping
  public League addLeague(@RequestBody AddLeagueRequest request) {
    return leagueService.addLeague(request.getName());
  }

  @PostMapping("/{leagueId}/challenge")
  public List<ChallengeResponse> addLeagueChallenge(
      @PathVariable String leagueId, @RequestBody CreateChallengeRequest request) {
    return leagueService.addChallenge(
        leagueId, request.getChallengerId(), request.getChallengedId());
  }

  @PatchMapping("/{leagueId}/challenge/{challengeId}")
  public ChallengeResponse handleLeagueChallengeResult(
      @PathVariable String leagueId,
      @PathVariable String challengeId,
      @RequestBody ChallengeResultRequest request) {
    return leagueService.handleChallengeResult(leagueId, challengeId, request.getWinnerId(), request.getLoserId());
  }

  @GetMapping("/{leagueId}/player")
  public Set<String> getLeaguePlayers(@PathVariable String leagueId) {
    return leagueService.getLeaguePlayers(leagueId);
  }

  @PostMapping("/{leagueId}/player/{playerId}")
  public Set<String> addLeaguePlayer(@PathVariable String leagueId, @PathVariable String playerId) {
    return leagueService.handlePlayerAdded(leagueId, playerId);
  }

  @DeleteMapping("/{leagueId}/player/{playerId}")
  public Set<String> removeLeaguePlayer(
      @PathVariable String leagueId, @PathVariable String playerId) {
    return leagueService.handlePlayerRemoved(leagueId, playerId);
  }
}
