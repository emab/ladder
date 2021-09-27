package com.ladder.server.controller;

import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.request.LeaguePlayerRequest;
import com.ladder.server.request.LeagueResultRequest;
import com.ladder.server.service.LeagueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/league")
public class LeagueController {

  private final LeagueRepository leagueRepository;
  private final LeagueService leagueService;

  public LeagueController(LeagueRepository leagueRepository, LeagueService leagueService) {
    this.leagueRepository = leagueRepository;
    this.leagueService = leagueService;
  }

  @GetMapping
  public List<League> getLeagues() {
    return leagueRepository.findAll();
  }

  @PostMapping
  public League addLeague(String name) {
    return leagueRepository.save(new League(name));
  }

  @GetMapping("/{leagueId}")
  public League getLeague(@PathVariable UUID leagueId) {
    return leagueRepository.findById(leagueId).orElseThrow();
  }

  @PostMapping("/{leagueId}/result")
  public League addLeagueResult(
      @PathVariable UUID leagueId, @RequestBody LeagueResultRequest request) {
    return leagueService.handleLeagueResult(leagueId, request.getWinnerId(), request.getLoserId());
  }

  @PostMapping("/{leagueId}/player")
  public League addLeaguePlayer(@PathVariable UUID leagueId, @RequestBody LeaguePlayerRequest request) {
    return leagueService.handlePlayerAdded(leagueId, request.getPlayerId());
  }

  @DeleteMapping("/{leagueId}/player")
  public League removeLeaguePlayer(@PathVariable UUID leagueId, @RequestBody LeaguePlayerRequest request) {
    return leagueService.handlePlayerRemoved(leagueId, request.getPlayerId());
  }
}
