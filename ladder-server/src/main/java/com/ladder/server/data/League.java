package com.ladder.server.data;

import lombok.Getter;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Entity
public class League {
  @Id
  private String id;
  private String name;
  @OneToMany(cascade = CascadeType.ALL)
  private List<Challenge> challenges;
  @ElementCollection
  private Set<String> players;
  @ElementCollection
  private Map<String, Integer> scores;

  public League(String name) {
    this.name = name;
    this.scores = new HashMap<>();
    this.challenges = new ArrayList<>();
    this.players = new HashSet<>();
  }

  public League() {}

  public String getId() {
    return id;
  }

  public String updateLeagueName(String name) {
    this.name = name;
    return this.name;
  }

  public Set<String> addPlayer(String playerId) {
    this.players.add(playerId);
    return this.players;
  }

  public Set<String> removePlayer(String playerId) {
    this.players.remove(playerId);
    return this.players;
  }

  public List<Challenge> addChallenge(String challengerId, String challengedId) {
    var challenge = new Challenge(challengerId, challengedId);
    challenges.add(challenge);
    return challenges;
  }

  public Challenge handleChallengeResult(String challengeId, String winnerId, String loserId) {
    var updateChallenge =
        this.challenges.stream()
            .filter(challenge -> challenge.getId().equals(challengeId))
            .findFirst()
            .orElseThrow();

    if (!updateChallenge.isOpen()) {
      return updateChallenge;
    }

    updateChallenge.setResult(winnerId, loserId);

    handleResult(winnerId, loserId);

    return updateChallenge;
  }

  public List<String> getChallengeIds() {
    return challenges.stream().map(Challenge::getId).collect(Collectors.toList());
  }

  public Map<String, Integer> handleResult(String winnerId, String loserId) {
    scores.compute(
            winnerId, (uuid, score) -> score == null ? 3 : handleScoreChange(score, Result.WIN));
    scores.compute(
            loserId, (uuid, score) -> score == null ? 0 : handleScoreChange(score, Result.LOSS));

    return scores;
  }

  public Map<String, Integer> handleDraw(String playerAId, String playerBId) {
    scores.compute(
            playerAId, (uuid, score) -> score == null ? 1 : handleScoreChange(score, Result.DRAW));
    scores.compute(
            playerBId, (uuid, score) -> score == null ? 1 : handleScoreChange(score, Result.DRAW));

    return scores;
  }

  private Integer handleScoreChange(Integer currentScore, Result result) {
    if (result == Result.WIN) {
      return currentScore + 3;
    }
    if (result == Result.DRAW) {
      return currentScore + 1;
    }
    return currentScore;
  }

  public List<LeaderboardEntry> getLeaderboardList() {
    return this.scores.entrySet().stream()
            .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
            .map(entry -> new LeaderboardEntry(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());
  }

  @Override
  public String toString() {
    return "League{" +
            "leagueId=" + id +
            ", name='" + name + '\'' +
            '}';
  }
}
