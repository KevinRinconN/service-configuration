package com.microservice.user.contexts.user.domain.port.repository;

import com.microservice.user.contexts.user.domain.model.dto.UserDto;

import java.util.Optional;

public interface IUserRepository {
    Optional<UserDto> getByUsername(String username);
    Optional<UserDto> getByEmail(String email);
    UserDto create(UserDto user);
}
