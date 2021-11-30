package com.ladder.server.data;

public class LeaderboardEntry {
    private final String playerId;
    private final int score;

    public LeaderboardEntry(String playerId, int score) {
        this.playerId = playerId;
        this.score = score;
    }

    public String getPlayerId() {
        return playerId;
    }

    public int getScore() {
        return score;
    }
}
