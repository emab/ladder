package com.ladder.server.service;

import com.ladder.server.data.Challenge;
import com.ladder.server.data.ChallengeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChallengeService {
  private final ChallengeRepository challengeRepository;

  public ChallengeService(ChallengeRepository challengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  public List<Challenge> getPlayerChallenges(Integer playerId) {
    return challengeRepository.findAll().stream()
        .filter(
            challenge ->
                    (challenge.getWinner().getPlayerId().equals(playerId)
                    || challenge.getChallenged().getPlayerId().equals(playerId)
                    || challenge.getChallenger().getPlayerId().equals(playerId)))
        .collect(Collectors.toList());
  }
}
