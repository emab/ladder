package com.ladder.server;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class League {
    UUID id;
    String name;
    List<LeaderboardEntry> leaderboard;

    public League(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
        leaderboard = new ArrayList<>();
    }
}
