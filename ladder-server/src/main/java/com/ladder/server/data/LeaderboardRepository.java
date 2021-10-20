package com.ladder.server.data;

import com.ladder.server.data.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Integer> {
}