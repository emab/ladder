package com.ladder.server.data;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class Player {
  private UUID id;
  private String username;
  private List<UUID> leagues;

  public Player(String username) {
    this.id = UUID.randomUUID();
    this.username = username;
    this.leagues = new ArrayList<>();
  }
}
