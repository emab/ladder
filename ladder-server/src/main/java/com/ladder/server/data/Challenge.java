package com.ladder.server.data;

import org.bson.types.ObjectId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.UUID;

@Entity
public class Challenge {
  @Id private String id;
  private String challengerId;
  private String challengedId;
  @OneToOne private ChallengeResult result;

  private ChallengeState state;

  public Challenge() {
    this.state = ChallengeState.OPEN;
    this.result = new ChallengeResult();
  }

  public Challenge(String challengerId, String challengedId) {
    this.challengerId = challengerId;
    this.challengedId = challengedId;
    this.state = ChallengeState.OPEN;
    this.result = new ChallengeResult();
    this.id = ObjectId.get().toString();
  }

  public ChallengeResult getResult() {
    if (state == ChallengeState.CLOSED) {
      return result;
    }
    return null;
  }

  public String getId() {
    return id;
  }

  public String getChallengerId() {
    return challengerId;
  }

  public String getChallengedId() {
    return challengedId;
  }

  public boolean isOpen() {
    return this.state.equals(ChallengeState.OPEN);
  }

  public void setResult(String winnerId, String loserId) {
    System.out.println(winnerId + " " + loserId);
    if (isOpen()) {
      this.state = ChallengeState.CLOSED;
      this.result.setWinner(winnerId);
      this.result.setLoser(loserId);
      this.result.setDraw(false);
    }
  }

  public void setDraw() {
    if (isOpen()) {
      this.state = ChallengeState.CLOSED;
      this.result.setDraw(true);
    }
  }

  public ChallengeState getState() {
    return state;
  }
}
