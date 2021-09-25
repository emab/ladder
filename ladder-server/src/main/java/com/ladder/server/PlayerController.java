package com.ladder.server;

import org.springframework.web.bind.annotation.*;

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
    public Player addPlayer(String username) {
        return playerRepository.save(new Player(username));
    }

    @PutMapping
    public void updateScores(UUID winningPlayerId, UUID losingPlayerId) {
        // TODO score logic
    }
}
