package com.microservice.user.contexts.auth.application.query;

import com.microservice.user.contexts.auth.domain.model.dto.TokenInfoDto;
import com.microservice.user.contexts.auth.domain.services.UserInfoByTokenService;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserInfoByTokenHandler {
    private final UserInfoByTokenService userInfoByTokenService;

    public UserResponse execute(String token){
        return userInfoByTokenService.execute(token);
    }
}
