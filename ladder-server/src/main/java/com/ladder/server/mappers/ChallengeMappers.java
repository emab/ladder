package com.ladder.server.mappers;

import com.ladder.server.controller.response.ChallengeResponse;
import com.ladder.server.data.Challenge;

import java.util.List;
import java.util.stream.Collectors;

public class ChallengeMappers {
  public static ChallengeResponse toChallengeResponse(Challenge challenge) {
    return ChallengeResponse.builder()
        .challengeId(challenge.getId())
        .challenger(challenge.getChallengerId())
        .challenged(challenge.getChallengedId())
        .result(challenge.getResult())
        .state(challenge.getState())
        .build();
  }

  public static List<ChallengeResponse> toChallengeResponse(List<Challenge> challenges) {
    return challenges.stream()
        .map(ChallengeMappers::toChallengeResponse)
        .collect(Collectors.toList());
  }
}
