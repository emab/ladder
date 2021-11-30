package com.ladder.server.controller.response;

import com.ladder.server.data.ChallengeResult;
import com.ladder.server.data.ChallengeState;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChallengeResponse {
    private String challengeId;
    private String challenger;
    private String challenged;
    private ChallengeResult result;
    private ChallengeState state;
}
