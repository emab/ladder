package com.ladder.server.data;

import com.ladder.server.data.League;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LeagueRepository extends MongoRepository<League, UUID> {
}