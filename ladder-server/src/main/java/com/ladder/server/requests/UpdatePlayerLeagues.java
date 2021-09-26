package com.ladder.server.requests;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdatePlayerLeagues {
    UpdateType updateType;
    UUID leagueId;
}
