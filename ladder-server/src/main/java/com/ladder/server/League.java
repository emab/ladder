package com.ladder.server;

import lombok.Data;

import java.util.*;

@Data
public class League {
    UUID id;
    String name;
    Map<UUID, LeaderboardEntry> leaderboard;

    public League(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
        leaderboard = new HashMap<>();
    }
}
