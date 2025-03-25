package com.microservice.user.contexts.user.infrastructure.rest;

import com.microservice.common.utils.responseHandler.ResponseHandler;
import com.microservice.user.contexts.user.application.command.UserGetByIdHandler;
import com.microservice.user.contexts.user.domain.model.dto.UserCreateDto;
import com.microservice.user.contexts.user.domain.model.dto.UserDto;
import com.microservice.user.contexts.user.domain.model.dto.UserResponse;
import com.microservice.user.contexts.user.domain.services.UserCreateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserGetByIdHandler userGetByIdHandler;


    @GetMapping("/{username}")
    public ResponseHandler<UserResponse> getUserById(@PathVariable String username) {
        return ResponseHandler.success("Peticion exitosa",userGetByIdHandler.execute(username));
    }
}
