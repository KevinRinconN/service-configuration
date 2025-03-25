package com.microservice.user.contexts.user.infrastructure.adapter.repositories;

import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.port.repository.IUserRepository;
import com.microservice.user.contexts.user.infrastructure.adapter.mapper.UserMapperDbo;
import com.microservice.user.contexts.user.infrastructure.adapter.repositories.jpa.IUserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements IUserRepository {
    private final IUserJpaRepository userJpaRepository;
    private final UserMapperDbo userMapperDbo;

    @Override
    public Optional<UserDto> getByUsername(String username) {
        var optionalUser = userJpaRepository.findById(username);
        return optionalUser.map(userMapperDbo::toDomain);
    }

    @Override
    public Optional<UserDto> getByEmail(String email) {
        var optionalUser = userJpaRepository.findByEmail(email);
        return optionalUser.map(userMapperDbo::toDomain);
    }

    @Override
    public UserDto create(UserDto user) {
        var userToSave = userMapperDbo.toDbo(user);
        var userSaved = userJpaRepository.save(userToSave);
        return userMapperDbo.toDomain(userSaved);
    }
}
