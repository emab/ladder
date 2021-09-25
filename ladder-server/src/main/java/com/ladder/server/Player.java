package com.ladder.server;

import lombok.Data;
import java.util.UUID;

@Data
public class Player {
    UUID id;
    String username;
    Integer position;

    public Player(String username) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.position = 0;
    }
}
