package com.ladder.server.controller;

import com.ladder.server.data.Challenge;
import com.ladder.server.data.Player;
import com.ladder.server.request.AddPlayerRequest;
import com.ladder.server.service.ChallengeService;
import com.ladder.server.service.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {
  private final PlayerService playerService;
  private final ChallengeService challengeService;

  public PlayerController(PlayerService playerService, ChallengeService challengeService) {
    this.playerService = playerService;
    this.challengeService = challengeService;
  }

  @GetMapping
  public List<Player> getPlayers() {
    return playerService.getPlayers();
  }

  @PostMapping
  public Player addPlayer(@RequestBody AddPlayerRequest request) {
    return playerService.addPlayer(request.getUsername());
  }

  @DeleteMapping("/{playerId}")
  public Player deletePlayer(@PathVariable Integer playerId) {
    return playerService.deletePlayer(playerId);
  }

  @GetMapping("/{playerId}/challenge")
  public List<Challenge> getPlayerChallenges(@PathVariable Integer playerId) {
    return challengeService.getPlayerChallenges(playerId);
  }
}
