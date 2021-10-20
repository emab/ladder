package com.ladder.server.service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public class ServiceUtils<Entity, Repository extends JpaRepository<Entity, Integer>> {
    private final Repository repository;

    public ServiceUtils(Repository repository) {
        this.repository = repository;
    }

    public Entity findOrThrow(Integer id) {
        if (id == null) {
            // TODO better exception, handle in controller layer with nice response
            throw new RuntimeException("id cannot be null");
        }
        return repository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("item with id " + id.toString() + " not found"));
    }
}
