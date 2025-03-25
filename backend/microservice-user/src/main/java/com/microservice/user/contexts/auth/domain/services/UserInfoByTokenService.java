package com.microservice.user.contexts.auth.domain.services;

import com.microservice.user.contexts.auth.domain.model.dto.TokenInfoDto;
import com.microservice.user.contexts.auth.domain.usecases.ExtractClaimsTokenUseCase;
import com.microservice.user.contexts.user.domain.mapper.UserMapper;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.usecases.UserGetByIdUseCase;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserInfoByTokenService {
    private final ExtractClaimsTokenUseCase extractClaimsTokenUseCase;
    private final UserGetByIdUseCase userGetByIdUseCase;
    public UserResponse execute (String token){
        Claims claims = extractClaimsTokenUseCase.execute(token);
        String username = claims.getSubject();
        return UserMapper.INSTANCE.toShow(userGetByIdUseCase.execute(username));
    }
}
