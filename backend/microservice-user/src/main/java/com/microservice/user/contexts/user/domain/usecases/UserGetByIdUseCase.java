package com.microservice.user.contexts.user.domain.usecases;

import com.microservice.common.utils.exception.NotFoundException;
import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.port.repository.IUserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserGetByIdUseCase {
    private final IUserRepository iUserRepository;

    public UserDto execute (String username){
        return iUserRepository.getByUsername(username).orElseThrow(()-> new NotFoundException("El usuario con el id "+username+" no fue encontrado"));
    }
}
