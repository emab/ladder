package com.ladder.server;

import com.ladder.server.requests.AddPlayerRequest;
import com.ladder.server.requests.UpdatePlayerLeagues;
import com.ladder.server.requests.UpdateType;
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
    public Player addPlayer(@RequestBody AddPlayerRequest request) {
        return playerRepository.save(new Player(request.getUsername()));
    }

    @PutMapping("/{id}/league")
    public void updatePlayerLeagues(@RequestBody UpdatePlayerLeagues request, @PathVariable UUID id) {
        var playerOptional = playerRepository.findById(id);

        playerOptional.ifPresent(player -> {
            var playerLeagues = player.getLeagues();
            if (request.getUpdateType() == UpdateType.ADD) {
                playerLeagues.add(id);
            }
            playerLeagues.remove(id);
        });

    }
}
