package com.microservice.user.contexts.auth.application.bean;

import com.microservice.user.contexts.auth.domain.services.AuthenticateService;
import com.microservice.user.contexts.auth.domain.services.UserInfoByTokenService;
import com.microservice.user.contexts.auth.domain.usecases.AuthenticateUseCase;
import com.microservice.user.contexts.auth.domain.usecases.ExtractClaimsTokenUseCase;
import com.microservice.user.contexts.auth.domain.usecases.GenerateTokenUseCase;
import com.microservice.user.contexts.user.domain.usecases.UserGetByIdUseCase;
import io.jsonwebtoken.JwtParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;

import java.security.Key;


@Configuration
public class AuthConfig {

    @Bean
    public AuthenticateService authenticateService(AuthenticateUseCase authenticateUseCase){
        return new AuthenticateService(authenticateUseCase);
    }

    @Bean
    public AuthenticateUseCase authenticateUseCase(GenerateTokenUseCase generateTokenUseCase, AuthenticationManager authenticationManager){
        return new AuthenticateUseCase(generateTokenUseCase,authenticationManager);
    }

    @Bean
    public GenerateTokenUseCase generateTokenUseCase(Key key){
        return new GenerateTokenUseCase(key);
    }

    @Bean
    public UserInfoByTokenService userInfoByTokenService(ExtractClaimsTokenUseCase extractClaimsTokenUseCase, UserGetByIdUseCase userGetByIdUseCase){
        return new UserInfoByTokenService(extractClaimsTokenUseCase, userGetByIdUseCase);
    }

    @Bean
    public ExtractClaimsTokenUseCase extractClaimsTokenUseCase(JwtParser jwtParser){
        return new ExtractClaimsTokenUseCase(jwtParser);
    }
}
