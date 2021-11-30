package com.ladder.server.data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.UUID;

@Entity
public class ChallengeResult {
    @Id
    private String challengeResultId;
    private boolean draw;
    private String winnerId;
    private String loserId;

    public ChallengeResult(boolean draw, String winnerId, String loserId) {
        this.draw = draw;
        this.winnerId = winnerId;
        this.loserId = loserId;
        this.challengeResultId = UUID.randomUUID().toString();
    }

    public ChallengeResult() { }

    public boolean isDraw() {
        return this.draw;
    }

    public void setDraw(boolean draw) {
        this.draw = draw;
    }

    public String getWinner() {
        return this.winnerId;
    }

    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
    }

    public String getLoser() {
        return this.loserId;
    }

    public void setLoser(String loserId) {
        this.loserId = loserId;
    }
}
