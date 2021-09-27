package com.ladder.server.data;

import lombok.Data;

import java.util.*;

@Data
public class League {
  private UUID id;
  private String name;
  private Leaderboard leaderboard;

  public League(String name) {
    this.id = UUID.randomUUID();
    this.name = name;
    leaderboard = new Leaderboard();
  }

  public void addPlayer(Player player) {
    this.leaderboard.addPlayer(player);
  }

  public void removePlayer(Player player) {
    this.leaderboard.removePlayer(player);
  }

  public void handleLeagueResult(Player winner, Player loser) {
   this.leaderboard.swapPlayerRanks(winner, loser);
  }
}
