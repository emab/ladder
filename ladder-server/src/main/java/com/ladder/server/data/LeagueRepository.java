package com.ladder.server.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends MongoRepository<League, String> {
    List<League> findAllByPlayersContains(String player);
}
