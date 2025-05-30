package com.microservice.user.contexts.auth.domain.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class LoginDto {
    @NotNull
    private String username;

    @NotNull
    private String password;
}
