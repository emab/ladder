package com.ladder.server.data;

import lombok.Data;

@Data
public class LeaderboardEntry implements Comparable<LeaderboardEntry> {
    private Integer rank;
    private Player player;

    public LeaderboardEntry(Integer rank, Player player) {
        this.rank = rank;
        this.player = player;
    }

    @Override
    public int compareTo(LeaderboardEntry other) {
        var otherRank = other.getRank();
        var rank = this.rank;

        if (rank == null && otherRank == null) {
            return 0;
        } else if (rank == null) {
            return -1;
        } else if (otherRank == null) {
            return 1;
        } else if (rank > otherRank) {
            return 1;
        } else if (rank < otherRank) {
            return -1;
        }
        return 0;
    }
}


