package com.ladder.server.controller.request;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateChallengeRequest {
    private String challengerId;
    private String challengedId;
}
