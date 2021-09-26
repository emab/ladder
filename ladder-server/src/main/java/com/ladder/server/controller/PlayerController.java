package com.ladder.server.controller;

import com.ladder.server.data.Player;
import com.ladder.server.data.PlayerRepository;
import com.ladder.server.request.AddPlayerRequest;
import com.ladder.server.request.UpdatePlayerLeagues;
import com.ladder.server.request.UpdateType;
import com.ladder.server.service.LeagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/player")
public class PlayerController {
  private final PlayerRepository playerRepository;
  private final LeagueService leagueService;

  public PlayerController(PlayerRepository playerRepository, LeagueService leagueService) {
    this.playerRepository = playerRepository;
    this.leagueService = leagueService;
  }

  @GetMapping
  public List<Player> getPlayers() {
    return playerRepository.findAll();
  }

  @PostMapping
  public Player addPlayer(@RequestBody AddPlayerRequest request) {
    return playerRepository.save(new Player(request.getUsername()));
  }

  @DeleteMapping("/{id}")
  public void deletePlayer(@PathVariable UUID id) {
    var playerOptional = playerRepository.findById(id);
    var player =
        playerOptional.orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Player was not found in DB"));

    playerRepository.delete(player);
  }

  @PostMapping("/{id}/league")
  public Player updatePlayerLeagues(
      @RequestBody UpdatePlayerLeagues request, @PathVariable UUID id) {
    var playerOptional = playerRepository.findById(id);
    var player =
        playerOptional.orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Player was not found in DB"));
    var playerLeagues = player.getLeagues();

    if (request.getUpdateType() == UpdateType.ADD) {
      playerLeagues.add(request.getLeagueId());
      leagueService.handlePlayerAdded(player, request.getLeagueId());
    } else {
      playerLeagues.remove(request.getLeagueId());
      leagueService.handlePlayerRemoved(player, request.getLeagueId());
    }
    return playerRepository.save(player);
  }
}
