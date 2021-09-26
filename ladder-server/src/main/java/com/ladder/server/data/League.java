package com.ladder.server.data;

import lombok.Data;

import java.util.*;

@Data
public class League {
    private UUID id;
    private String name;
    private Map<UUID, LeaderboardEntry> leaderboard;

    public League(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
        leaderboard = new HashMap<>();
    }
}
