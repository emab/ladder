package com.ladder.server.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public class ServiceUtils<Entity, Repository extends MongoRepository<Entity, String>> {
    private final Repository repository;

    public ServiceUtils(Repository repository) {
        this.repository = repository;
    }

    public Entity findOrThrow(String id) {
        if (id == null) {
            // TODO better exception, handle in controller layer with nice response
            throw new RuntimeException("id cannot be null");
        }
        return repository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("item with id " + id + " not found"));
    }
}
