package com.ladder.server.service;

import com.ladder.server.data.Leaderboard;
import com.ladder.server.data.LeaderboardRepository;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardService {
    private final LeaderboardRepository leaderboardRepository;
    private final ServiceUtils<Leaderboard, LeaderboardRepository> leaderboardUtils;

    public LeaderboardService(LeaderboardRepository leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
        this.leaderboardUtils = new ServiceUtils<>(leaderboardRepository);
    }

    public Leaderboard handleChallengeResult(Integer leaderboardId, Integer winnerId, Integer loserId) {
        var leaderboard = leaderboardUtils.findOrThrow(leaderboardId);

        leaderboard.handleResult(winnerId, loserId);

        return leaderboardRepository.save(leaderboard);
    }
}
