package com.ladder.server.mappers;

import com.ladder.server.controller.response.LeagueResponse;
import com.ladder.server.data.League;

public class LeagueMappers {
  public static LeagueResponse toLeagueResponse(League league) {
    return LeagueResponse.builder()
        .LeagueId(league.getId())
        .name(league.getName())
        .challenges(league.getChallengeIds())
        .players(league.getPlayers())
        .leaderboard(league.getLeaderboardList())
        .build();
  }
}
