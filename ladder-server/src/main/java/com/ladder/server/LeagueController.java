package com.ladder.server;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/league")
public class LeagueController {

    private final LeagueRepository leagueRepository;

    public LeagueController(LeagueRepository leagueRepository) {
        this.leagueRepository = leagueRepository;
    }

    @GetMapping
    public List<League> getLeagues() {
        return leagueRepository.findAll();
    }

    @PostMapping
    public League addLeague(String name) {
        return leagueRepository.save(new League(name));
    }

    @GetMapping("/{id}")
    public League getLeague(@PathVariable UUID id) {
        return leagueRepository.findById(id).orElseThrow();
    }
}
