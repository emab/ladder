package com.ladder.server.request;

import lombok.Data;

import java.util.UUID;

@Data
public class LeagueResultRequest {
  UUID winnerId;
  UUID loserId;
}
