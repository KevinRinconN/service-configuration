package com.microservice.publication.contexts.shared.user.domain.model.dto;

import com.microservice.publication.contexts.shared.user.domain.model.enums.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data @RequiredArgsConstructor @AllArgsConstructor
public class UserDto {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private Rol rol;
}
