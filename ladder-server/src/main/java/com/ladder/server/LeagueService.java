package com.ladder.server;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class LeagueService {
    private final LeagueRepository leagueRepository;

    public LeagueService(LeagueRepository leagueRepository) {
        this.leagueRepository = leagueRepository;
    }

    public void handlePlayerAdded(Player player, UUID leagueId) {
        var league = leagueRepository.findById(leagueId).orElseThrow();

        league.leaderboard.put(player.getId(), new LeaderboardEntry(null, player));

        leagueRepository.save(league);
    }

    public void handlePlayerRemoved(Player player, UUID leagueId) {
        var league = leagueRepository.findById(leagueId).orElseThrow();

        var deletedRank = league.leaderboard.get(player.getId()).getRank();

        league.leaderboard.remove(player.getId());

        league.setLeaderboard(updatePlayerRanks(league.leaderboard, deletedRank));

        leagueRepository.save(league);
    }

    private Map<UUID, LeaderboardEntry> updatePlayerRanks(Map<UUID, LeaderboardEntry> leaderboard, Integer deletedRank) {
        leaderboard.entrySet().forEach(leaderboardEntry -> {
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

        var winnerEntry = league.leaderboard.get(winnerId);
        var loserEntry = league.leaderboard.get(loserId);

        var winnerRank = winnerEntry.getRank();
        var loserRank = loserEntry.getRank();

        if (loserRank == null && winnerRank == null) {
            winnerEntry.setRank(getLowestRank(league.leaderboard));
            loserEntry.setRank(getLowestRank(league.leaderboard));
            return leagueRepository.save(league);
        }

        if (loserRank == null) {
            loserEntry.setRank(getLowestRank(league.leaderboard));
            return leagueRepository.save(league);
        }

        if (winnerRank == null) {
            winnerEntry.setRank(loserRank);
            loserEntry.setRank(loserRank + 1);
            cascadeRanks(league.leaderboard, loserEntry);
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
        var lowestEntry = leaderboard
                .values()
                .stream()
                .filter(leaderboardEntry -> leaderboardEntry
                        .getRank() != null)
                .min((o1, o2) -> new RankComparator().compare(o1, o2))
                .orElse(null);

        if (lowestEntry == null) {
            return 1;
        }
        return lowestEntry.getRank() + 1;
    }

    private Map<UUID, LeaderboardEntry> cascadeRanks(Map<UUID, LeaderboardEntry> leaderboard, LeaderboardEntry insertEntry) {
        var insertRank = insertEntry.getRank();
        leaderboard.forEach((key, entry) -> {
            var entryRank = entry.getRank();
            if (entry.getRank() != null && entry != insertEntry && insertRank <= entry.getRank()) {
                entry.setRank(entryRank + 1);
            }
        });
        leaderboard.put(insertEntry.getPlayer().getId(), insertEntry);

        return leaderboard;
    }
}