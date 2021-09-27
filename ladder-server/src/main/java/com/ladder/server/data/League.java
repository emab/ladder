package com.ladder.server.data;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
public class League {
  private UUID id;
  private String name;
  private Map<UUID, LeaderboardEntry> leaderboard;

  public League(String name) {
    this.id = UUID.randomUUID();
    this.name = name;
    leaderboard = new HashMap<>();
  }

  public void addPlayer(Player player) {
    this.leaderboard.put(player.getId(), new LeaderboardEntry(null, player));
  }

  public void removePlayer(Player player) {
    Integer deletedPlayerRank = getPlayerRank(player);
    this.leaderboard.remove(player.getId());
    this.leaderboard.forEach(
        (key, entry) -> {
          Integer entryRank = entry.getRank();

          if (entryRank == null || deletedPlayerRank == null || entryRank < deletedPlayerRank) {
            return;
          }
          entry.setRank(entryRank - 1);
        });
  }

  public LeaderboardEntry getPlayerEntry(UUID playerId) {
    return this.leaderboard.get(playerId);
  }

  public Integer getLowestRank() {
    var lowestEntry =
        this.leaderboard.values().stream()
            .filter(leaderboardEntry -> leaderboardEntry.getRank() != null)
            .max(LeaderboardEntry::compareTo)
            .orElse(null);

    if (lowestEntry == null) {
      return 1;
    }
    return lowestEntry.getRank() + 1;
  }

  public void handleLeagueResult(UUID winnerId, UUID loserId) {
    LeaderboardEntry winnerEntry = this.getPlayerEntry(winnerId);
    LeaderboardEntry loserEntry = this.getPlayerEntry(loserId);

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
      winnerEntry.setRank(loserRank);
      loserEntry.setRank(loserRank + 1);
      cascadeRanks(loserEntry);
      return;
    }

    if (loserRank < winnerRank) {
      winnerEntry.setRank(loserRank);
      loserEntry.setRank(winnerRank);
    }
  }

  private void cascadeRanks(LeaderboardEntry insertEntry) {
    var insertRank = insertEntry.getRank();
    this.leaderboard.forEach(
            (key, entry) -> {
              var entryRank = entry.getRank();
              if (entry.getRank() != null && entry != insertEntry && insertRank <= entry.getRank()) {
                entry.setRank(entryRank + 1);
              }
            });
    this.leaderboard.put(insertEntry.getPlayer().getId(), insertEntry);
  }

  private Integer getPlayerRank(Player player) {
    return getLeaderboard().get(player.getId()).getRank();
  }
}
