package com.ladder.server.data;

import javax.persistence.*;
import java.util.*;

@Entity
public class Leaderboard {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer leaderboardId;

    @ElementCollection
    @MapKeyColumn(name = "playerId")
    private Map<Integer, Integer> leaderboard;

    public Leaderboard() {
        leaderboard = new HashMap<>();
    }

    public Integer getLeaderboardId() {
        return leaderboardId;
    }

    public Map<Integer, Integer> getLeaderboard() {
        return leaderboard;
    }

    public Map<Integer, Integer> handleResult(Integer winnerId, Integer loserId) {
        leaderboard.compute(winnerId, (uuid, score) -> score == null ? 10 : score + 10);
        leaderboard.compute(loserId, (uuid, score) -> score == null ? 0 : score - 10);

        return leaderboard;
    }
}
