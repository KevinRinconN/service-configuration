package com.microservice.user.contexts.user.domain.model.dto;

import com.microservice.user.contexts.user.domain.model.enums.Rol;
import lombok.Data;

@Data
public class UserResponse {
    private String username;
    private String firstname;
    private String lastname;
    private String bio;
    private String profilePicture;
    private String email;
    private Rol rol;
}
