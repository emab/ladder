package com.ladder.server.controller;

import com.ladder.server.controller.request.AddPlayerLeagueResponse;
import com.ladder.server.service.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/player")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/{playerId}/league")
    public Set<String> getPlayerLeagues(@PathVariable String playerId) {
        return playerService.getPlayerLeagues(playerId);
    }

    @PostMapping("/{playerId}/league")
    public Set<String> addPlayerLeague(@PathVariable String playerId, @RequestBody AddPlayerLeagueResponse addPlayerLeagueResponse) {
        return playerService.handlePlayerAdded(playerId, addPlayerLeagueResponse.getLeagueId());
    }

    @DeleteMapping("/{playerId}/league/{leagueId}")
    public Set<String> removePlayerLeague(
            @PathVariable String playerId, @PathVariable String leagueId) {
        return playerService.handlePlayerRemoved(playerId, leagueId);
    }
}
