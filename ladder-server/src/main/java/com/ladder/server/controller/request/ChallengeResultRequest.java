package com.ladder.server.controller.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ChallengeResultRequest {
  private String winnerId;
  private String loserId;
}
