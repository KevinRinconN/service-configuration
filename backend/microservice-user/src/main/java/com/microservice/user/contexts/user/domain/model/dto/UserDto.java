package com.microservice.user.contexts.user.domain.model.dto;

import com.microservice.user.contexts.user.domain.model.enums.Rol;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class UserDto {
    private String username;
    private String firstname;
    private String lastname;
    private String bio;
    private String profilePicture;
    private String email;
    private String password;
    private Rol rol;

    private Boolean locked = false;
    private Boolean disabled = false;
}
