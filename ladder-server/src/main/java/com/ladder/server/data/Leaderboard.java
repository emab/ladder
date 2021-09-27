package com.ladder.server.data;

import io.swagger.models.auth.In;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Leaderboard {
  private List<LeaderboardEntry> leaderboard;

  public Leaderboard() {
    this.leaderboard = new ArrayList<>();
  }

  public void removePlayer(Player player) {
    LeaderboardEntry entryToRemove =
        this.leaderboard.stream().filter(e -> e.getPlayer() == player).findFirst().orElseThrow();
    Integer rankToRemove = entryToRemove.getRank();
    List<LeaderboardEntry> updatedList =
        this.leaderboard.stream().filter(e -> e.getPlayer() != player).collect(Collectors.toList());

    updatedList.forEach(
        entry -> {
          Integer entryRank = entry.getRank();

          if (entryRank == null || rankToRemove == null || entryRank < rankToRemove) {
            return;
          }
          entry.setRank(entryRank - 1);
        });

    leaderboard = updatedList;
  }

  public void addPlayer(Player player) {
    this.leaderboard.add(new LeaderboardEntry(player));
  }

  public LeaderboardEntry getEntry(Player player) {
    return this.leaderboard.stream()
        .filter(entry -> entry.getPlayer() == player)
        .findFirst()
        .orElseThrow();
  }

  public Integer getLowestRank() {
    var lowestEntry =
        this.leaderboard.stream()
            .filter(leaderboardEntry -> leaderboardEntry.getRank() != null)
            .max(LeaderboardEntry::compareTo)
            .orElse(null);

    if (lowestEntry == null) {
      return 1;
    }
    return lowestEntry.getRank() + 1;
  }

  public void swapPlayerRanks(Player winner, Player loser) {
      LeaderboardEntry winnerEntry = this.getEntry(winner);
      LeaderboardEntry loserEntry = this.getEntry(loser);

      Integer winnerRank = winnerEntry.getRank();
      Integer loserRank = loserEntry.getRank();

      if (loserRank == null && winnerRank == null) {
          winnerEntry.setRank(this.getLowestRank());
          loserEntry.setRank(this.getLowestRank());
          return;
      }

      if (loserRank == null) {
          loserEntry.setRank(this.getLowestRank());
          return;
      }

      if (winnerRank == null) {
          insertEntry(winnerRank, winner);
          return;
      }

      if (loserRank < winnerRank) {
          winnerEntry.setRank(loserRank);
          loserEntry.setRank(winnerRank);
      }
  }

  private void insertEntry(Integer rank, Player player) {
    this.leaderboard.forEach(
        entry -> {
          Integer entryRank = entry.getRank();
          if (entryRank != null && entryRank >= rank) {
            entry.setRank(entryRank - 1);
          }
        });
    this.leaderboard.add(new LeaderboardEntry(rank, player));
  }
}
