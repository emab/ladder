package com.ladder.server;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class Player {
    UUID id;
    String username;
    List<UUID> leagues;

    public Player(String username) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.leagues = new ArrayList<>();
    }
}