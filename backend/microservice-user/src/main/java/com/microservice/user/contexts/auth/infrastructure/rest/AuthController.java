package com.microservice.user.contexts.auth.infrastructure.rest;

import com.microservice.common.utils.responseHandler.ResponseHandler;
import com.microservice.user.contexts.auth.application.command.AuthenticateHandler;
import com.microservice.user.contexts.auth.application.query.UserInfoByTokenHandler;
import com.microservice.user.contexts.auth.domain.model.dto.AuthResponseDto;
import com.microservice.user.contexts.auth.domain.model.dto.LoginDto;
import com.microservice.user.contexts.auth.domain.model.dto.TokenInfoDto;
import com.microservice.user.contexts.user.domain.model.dto.UserCreateDto;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.services.UserCreateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticateHandler authenticateHandler;
    private final UserInfoByTokenHandler userInfoByTokenHandler;
    private final UserCreateService userCreateService;
    @PostMapping("/login")
    public ResponseHandler<AuthResponseDto> authenticate(
            @RequestBody @Valid LoginDto loginDto
    ){
        AuthResponseDto authResponse = authenticateHandler.execute(loginDto);
        return ResponseHandler.success("Login successful", authResponse);
    }

    @GetMapping
    public ResponseHandler<UserResponse> authenticate(
            @RequestParam String accessToken
    ){
        return ResponseHandler.success("Login successful", userInfoByTokenHandler.execute(accessToken));
    }


    @PostMapping("/sign-up")
    public ResponseHandler<UserResponse> create(@RequestBody @Valid UserCreateDto signUpRequest){
        return ResponseHandler.response("User has been successfully created", HttpStatus.CREATED, userCreateService.execute(signUpRequest));
    }
}
