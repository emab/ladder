package com.ladder.server.controller;

import com.ladder.server.data.Player;
import com.ladder.server.data.PlayerRepository;
import com.ladder.server.request.AddPlayerRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/player")
public class PlayerController {
  private final PlayerRepository playerRepository;

  public PlayerController(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
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
}
