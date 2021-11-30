package com.ladder.server.controller.response;

import com.ladder.server.data.LeaderboardEntry;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class LeagueResponse {
    private String LeagueId;
    private String name;
    private List<String> challenges;
    private Set<String> players;
    private List<LeaderboardEntry> leaderboard;
}


