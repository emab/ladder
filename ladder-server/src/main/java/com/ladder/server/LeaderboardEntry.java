package com.ladder.server;

import lombok.Data;

@Data
public class LeaderboardEntry {
    Integer rank;
    Player player;

    public LeaderboardEntry(Integer rank, Player player) {
        this.rank = rank;
        this.player = player;
    }
}
