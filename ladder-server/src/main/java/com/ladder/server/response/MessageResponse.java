package com.ladder.server.response;

import lombok.Data;

@Data
public class MessageResponse {
  String message;

  public MessageResponse(String message) {
    this.message = message;
  }
}
