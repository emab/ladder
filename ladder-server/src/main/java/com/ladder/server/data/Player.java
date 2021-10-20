package com.ladder.server.data;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
public class Player {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private Integer playerId;
  @Setter
  private String username;

  public Player(String username) {
    this.username = username;
  }

  public Player() {
  }
}
