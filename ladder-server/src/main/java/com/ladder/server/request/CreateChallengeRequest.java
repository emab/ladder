package com.ladder.server.request;

import lombok.Data;

@Data
public class CreateChallengeRequest {
    private Integer challengerId;
    private Integer challengedId;
}
