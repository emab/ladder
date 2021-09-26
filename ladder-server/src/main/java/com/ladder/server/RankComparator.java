package com.ladder.server;

import java.util.Comparator;

public class RankComparator implements Comparator<LeaderboardEntry> {
    @Override
    public int compare(LeaderboardEntry o1, LeaderboardEntry o2) {
        if (o1.getRank() == null && o2.getRank() == null) {
            return 0;
        } else if (o1.getRank() != null && o2.getRank() == null) {
            return 1;
        } else if (o1.getRank() == null && o2.getRank() != null) {
            return -1;
        } else if ((o1.getRank() > o2.getRank())) {
            return 1;
        } else if (o1.getRank() < o2.getRank()) {
            return -1;
        }
        return 0;
    }
}
