package com.microservice.user.contexts.auth.domain.usecases;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ExtractClaimsTokenUseCase {
    private final JwtParser jwtParser;

    public Claims execute(String token) {
        try {
            Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
            return claimsJws.getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Token no valido, Error al extraer los claims del token: " + e.getMessage(), e);
        }
    }
}
