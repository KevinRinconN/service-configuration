package com.microservice.user.contexts.user.domain.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class UserCreateDto {
    @Size(min = 4, max = 22)
    @NotEmpty(message = "username requerido")
    private String username;
    @Email
    @NotEmpty(message = "email requerido")
    private String email;
    @Size(min = 4 , max = 10)
    @NotEmpty(message = "firstname requerido")
    private String firstname;
    @Size(min = 4, max = 10)
    @NotEmpty(message = "lastname requerido")
    private String lastname;
    private String bio;
    @Size(min = 4, max = 22)
    @NotEmpty(message = "password requerida")
    private String password;
    @NotEmpty(message = "rol requerido")
    @Pattern(regexp = "ADMIN|OPERATOR", message = "Rol inválido")
    private String rol;
}
