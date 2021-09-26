package com.ladder.server.service;

import com.ladder.server.data.LeaderboardEntry;
import com.ladder.server.data.League;
import com.ladder.server.data.LeagueRepository;
import com.ladder.server.data.Player;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

@Service
public class LeagueService {
  private final LeagueRepository leagueRepository;

  public LeagueService(LeagueRepository leagueRepository) {
    this.leagueRepository = leagueRepository;
  }

  public void handlePlayerAdded(Player player, UUID leagueId) {
    var league =
        leagueRepository
            .findById(leagueId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "League was not found in DB"));

    league.getLeaderboard().put(player.getId(), new LeaderboardEntry(null, player));

    leagueRepository.save(league);
  }

  public void handlePlayerRemoved(Player player, UUID leagueId) {
    var league = leagueRepository.findById(leagueId).orElseThrow();

    var deletedRank = league.getLeaderboard().get(player.getId()).getRank();

    league.getLeaderboard().remove(player.getId());

    league.setLeaderboard(updatePlayerRanks(league.getLeaderboard(), deletedRank));

    leagueRepository.save(league);
  }

  private Map<UUID, LeaderboardEntry> updatePlayerRanks(
      Map<UUID, LeaderboardEntry> leaderboard, Integer deletedRank) {
    leaderboard
        .entrySet()
        .forEach(
            leaderboardEntry -> {
              var entryRank = leaderboardEntry.getValue().getRank();
              var entryPlayer = leaderboardEntry.getValue().getPlayer();

              if (entryRank == null || entryRank < deletedRank) {
                return;
              }
              leaderboardEntry.setValue(new LeaderboardEntry(entryRank - 1, entryPlayer));
            });

    return leaderboard;
  }

  public League handleLeagueResult(UUID leagueId, UUID winnerId, UUID loserId) {
    var league = leagueRepository.findById(leagueId).orElseThrow();

    var winnerEntry = league.getLeaderboard().get(winnerId);
    var loserEntry = league.getLeaderboard().get(loserId);

    var winnerRank = winnerEntry.getRank();
    var loserRank = loserEntry.getRank();

    if (loserRank == null && winnerRank == null) {
      winnerEntry.setRank(getLowestRank(league.getLeaderboard()));
      loserEntry.setRank(getLowestRank(league.getLeaderboard()));
      return leagueRepository.save(league);
    }

    if (loserRank == null) {
      loserEntry.setRank(getLowestRank(league.getLeaderboard()));
      return leagueRepository.save(league);
    }

    if (winnerRank == null) {
      winnerEntry.setRank(loserRank);
      loserEntry.setRank(loserRank + 1);
      cascadeRanks(league.getLeaderboard(), loserEntry);
      return leagueRepository.save(league);
    }

    if (loserRank < winnerRank) {
      winnerEntry.setRank(loserRank);
      loserEntry.setRank(winnerRank);
      return leagueRepository.save(league);
    }

    return leagueRepository.save(league);
  }

  private Integer getLowestRank(Map<UUID, LeaderboardEntry> leaderboard) {
    var lowestEntry =
        leaderboard.values().stream()
            .filter(leaderboardEntry -> leaderboardEntry.getRank() != null)
            .max(LeaderboardEntry::compareTo)
            .orElse(null);

    if (lowestEntry == null) {
      return 1;
    }
    return lowestEntry.getRank() + 1;
  }

  private void cascadeRanks(Map<UUID, LeaderboardEntry> leaderboard, LeaderboardEntry insertEntry) {
    var insertRank = insertEntry.getRank();
    leaderboard.forEach(
        (key, entry) -> {
          var entryRank = entry.getRank();
          if (entry.getRank() != null && entry != insertEntry && insertRank <= entry.getRank()) {
            entry.setRank(entryRank + 1);
          }
        });
    leaderboard.put(insertEntry.getPlayer().getId(), insertEntry);
  }
}
