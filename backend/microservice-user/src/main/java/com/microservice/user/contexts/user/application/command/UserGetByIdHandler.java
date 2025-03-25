package com.microservice.user.contexts.user.application.command;

import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.services.UserGetByIdService;
import com.microservice.user.contexts.user.domain.usecases.UserGetByIdUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserGetByIdHandler {
    private final UserGetByIdService userGetByIdService;

    public UserResponse execute (String username){
        return userGetByIdService.execute(username);
    }
}
