package com.ladder.server.data;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlayerRepository extends MongoRepository<Player, UUID> {}
