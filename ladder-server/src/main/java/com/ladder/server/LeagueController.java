package com.ladder.server;

import com.ladder.server.request.LeagueResultRequest;
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
    public League addLeagueResult(@PathVariable UUID leagueId, @RequestBody LeagueResultRequest request) {
        return leagueService.handleLeagueResult(leagueId, request.getWinnerId(), request.getLoserId());
    }
}
