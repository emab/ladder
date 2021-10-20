package com.ladder.server.data;

import lombok.Getter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Challenge {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter
    private Integer challengeId;
    @OneToOne
    private Player challenger;
    @OneToOne
    private Player challenged;
    @OneToOne
    private Player winner;
    @OneToOne
    private Player loser;

    private ChallengeState state;

    public Challenge(Player challenger, Player challenged) {
        this.state = ChallengeState.OPEN;
        this.challenger = challenger;
        this.challenged = challenged;
    }

    public Challenge() {
        this.state = ChallengeState.OPEN;
    }

    public Player getWinner() {
        if (isDone()) {
            return winner;
        }
        return null;
    }

    public Player getLoser() {
        if (isDone()) {
            return loser;
        }
        return null;
    }

    public Player getChallenger() {
        return challenger;
    }

    public Player getChallenged() {
        return challenged;
    }

    private boolean isDone() {
        return this.state.equals(ChallengeState.CLOSED);
    }

    public Player setWinner(Player player) {
        this.state = ChallengeState.CLOSED;
        this.winner = player;
        this.loser = this.challenger == winner ? this.challenged : this.challenger;
        return this.winner;
    }
}
