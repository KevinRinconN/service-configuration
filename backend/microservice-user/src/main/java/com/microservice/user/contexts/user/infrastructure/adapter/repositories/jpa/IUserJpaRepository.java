package com.microservice.user.contexts.user.infrastructure.adapter.repositories.jpa;

import com.microservice.user.contexts.user.infrastructure.adapter.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserJpaRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}
