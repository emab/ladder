package com.ladder.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LadderController {

    @GetMapping("/")
    public String test() {
        return "Testing";
    }

}