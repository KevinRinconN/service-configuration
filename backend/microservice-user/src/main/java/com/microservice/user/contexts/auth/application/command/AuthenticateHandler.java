package com.microservice.user.contexts.auth.application.command;

import com.microservice.user.contexts.auth.domain.model.dto.AuthResponseDto;
import com.microservice.user.contexts.auth.domain.model.dto.LoginDto;
import com.microservice.user.contexts.auth.domain.services.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticateHandler {
    private final AuthenticateService authenticateService;

    public AuthResponseDto execute (LoginDto loginDto){
        return authenticateService.execute(loginDto);
    }
}
