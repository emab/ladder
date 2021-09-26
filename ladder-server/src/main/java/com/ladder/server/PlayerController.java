package com.ladder.server;

import com.ladder.server.request.AddPlayerRequest;
import com.ladder.server.request.UpdatePlayerLeagues;
import com.ladder.server.request.UpdateType;
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
        var player = playerOptional.orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Player was not found in DB"));

        playerRepository.delete(player);
    }

    @PostMapping("/{id}/league")
    public Player updatePlayerLeagues(@RequestBody UpdatePlayerLeagues request, @PathVariable UUID id) {
        var playerOptional = playerRepository.findById(id);
        var player = playerOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Player was not found in DB"));
        var playerLeagues = player.getLeagues();

        if (request.getUpdateType() == UpdateType.ADD) {
            playerLeagues.add(request.getLeagueId());
        } else {
            playerLeagues.remove(request.getLeagueId());
        }
        return playerRepository.save(player);
    }
}
