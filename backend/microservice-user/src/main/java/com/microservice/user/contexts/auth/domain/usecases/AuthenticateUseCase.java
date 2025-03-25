package com.microservice.user.contexts.auth.domain.usecases;

import com.microservice.user.contexts.auth.domain.model.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RequiredArgsConstructor
public class AuthenticateUseCase {
    private final GenerateTokenUseCase generateTokenUseCase;
    private final AuthenticationManager authenticationManager;

    public String execute (LoginDto loginDto) {
        try {
            // Autenticar al usuario
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()
                    )
            );
            // Generar token JWT
            return generateTokenUseCase.execute(authentication);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Credenciales inválidas");
        }
    }
}
