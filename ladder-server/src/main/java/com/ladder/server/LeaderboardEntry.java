package com.ladder.server;

import lombok.Data;

@Data
public class LeaderboardEntry {
    Integer rank;
    Player player;
}
