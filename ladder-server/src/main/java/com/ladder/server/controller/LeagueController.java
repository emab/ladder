package com.ladder.server.controller;

import com.ladder.server.data.Challenge;
import com.ladder.server.data.League;
import com.ladder.server.request.AddLeagueRequest;
import com.ladder.server.request.ChallengeResultRequest;
import com.ladder.server.request.CreateChallengeRequest;
import com.ladder.server.request.UpdateLeagueNameRequest;
import com.ladder.server.service.LeagueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/league")
public class LeagueController {

  private final LeagueService leagueService;

  public LeagueController(LeagueService leagueService) {
    this.leagueService = leagueService;
  }

  @GetMapping
  public List<League> getLeagues() {
    return leagueService.getLeagues();
  }

  @PostMapping
  public League addLeague(@RequestBody AddLeagueRequest request) {
    return leagueService.addLeague(request.getName());
  }

  @GetMapping("/{leagueId}")
  public League getLeague(@PathVariable Integer leagueId) {
    return leagueService.getLeague(leagueId);
  }

  @PatchMapping("/{leagueId}")
  public League updateLeagueName(
      @PathVariable Integer leagueId, @RequestBody UpdateLeagueNameRequest request) {
    return leagueService.updateLeagueName(leagueId, request.getName());
  }

  @GetMapping("/{leagueId}/challenge")
  public List<Challenge> getLeagueChallenges(@PathVariable Integer leagueId) {
    return leagueService.getLeagueChallenges(leagueId);
  }

  @PostMapping("/{leagueId}/challenge")
  public League addLeagueChallenge(
      @PathVariable Integer leagueId, @RequestBody CreateChallengeRequest request) {
    return leagueService.addChallenge(
        leagueId, request.getChallengerId(), request.getChallengedId());
  }

  @PatchMapping("/{leagueId}/challenge/{challengeId}")
  public League handleLeagueChallengeResult(
      @PathVariable Integer leagueId,
      @PathVariable Integer challengeId,
      @RequestBody ChallengeResultRequest request) {
    return leagueService.handleChallengeResult(leagueId, challengeId, request.getWinnerId());
  }

  @PostMapping("/{leagueId}/player/{playerId}")
  public League addLeaguePlayer(@PathVariable Integer leagueId, @PathVariable Integer playerId) {
    return leagueService.handlePlayerAdded(leagueId, playerId);
  }

  @DeleteMapping("/{leagueId}/player/{playerId}")
  public League removeLeaguePlayer(
      @PathVariable Integer leagueId, @PathVariable Integer playerId) {
    return leagueService.handlePlayerRemoved(leagueId, playerId);
  }
}
