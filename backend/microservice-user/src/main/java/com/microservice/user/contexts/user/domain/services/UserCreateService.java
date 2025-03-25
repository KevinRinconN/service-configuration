package com.microservice.user.contexts.user.domain.services;

import com.microservice.user.contexts.user.domain.mapper.UserMapper;
import com.microservice.user.contexts.user.domain.model.dto.UserCreateDto;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.usecases.UserCreateUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserCreateService {
    private final UserCreateUseCase userCreateUseCase;

    public UserResponse execute (UserCreateDto userCreateDto){
        return UserMapper.INSTANCE.toShow(userCreateUseCase.execute(userCreateDto));
    }
}
