package com.microservice.user.contexts.user.domain.services;

import com.microservice.user.contexts.user.domain.mapper.UserMapper;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.usecases.UserGetByIdUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserGetByIdService {
    private final UserGetByIdUseCase getByIdUseCase;

    public UserResponse execute (String username){
        return UserMapper.INSTANCE.toShow(getByIdUseCase.execute(username));
    }
}
