package com.ladder.server.data;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
public class League {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer leagueId;
  private String name;
  @OneToMany(cascade = CascadeType.ALL)
  private List<Challenge> challenges;
  @ManyToMany
  private List<Player> players;
  @OneToOne(cascade = CascadeType.ALL)
  private Leaderboard leaderboard;

  public League(String name) {
    this.name = name;
    this.leaderboard = new Leaderboard();
    this.challenges = new ArrayList<>();
    this.players = new ArrayList<>();
  }

  public League() {}

  public String updateLeagueName(String name) {
    this.name = name;
    return this.name;
  }

  public List<Player> addPlayer(Player player) {
    this.players.add(player);
    return this.players;
  }

  public List<Player> removePlayer(Player player) {
    this.players.remove(player);
    return this.players;
  }

  public List<Challenge> addChallenge(Player challenger, Player challenged) {
    var challenge = new Challenge(challenger, challenged);
    challenges.add(challenge);
    return challenges;
  }

  public Challenge handleChallengeResult(Integer challengeId, Player winner) {
    var updateChallenge =
        this.challenges.stream()
            .filter(challenge -> challenge.getChallengeId().equals(challengeId))
            .findFirst()
            .orElseThrow();

    updateChallenge.setWinner(winner);

    leaderboard.handleResult(winner.getPlayerId(), updateChallenge.getLoser().getPlayerId());

    return updateChallenge;
  }


}
