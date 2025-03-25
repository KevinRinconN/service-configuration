package com.microservice.user.contexts.auth.domain.services;

import com.microservice.user.contexts.auth.domain.model.dto.AuthResponseDto;
import com.microservice.user.contexts.auth.domain.model.dto.LoginDto;
import com.microservice.user.contexts.auth.domain.usecases.AuthenticateUseCase;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthenticateService {
    private final AuthenticateUseCase authenticateUseCase;

    public AuthResponseDto execute (LoginDto loginDto){
        return new AuthResponseDto(authenticateUseCase.execute(loginDto));
    }
}
