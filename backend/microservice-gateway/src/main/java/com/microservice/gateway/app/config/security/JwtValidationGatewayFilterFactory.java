package com.microservice.gateway.app.config.security;

import io.jsonwebtoken.*;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class JwtValidationGatewayFilterFactory extends
        AbstractGatewayFilterFactory<Object> {
    private final JwtParser jwtParser;

    public JwtValidationGatewayFilterFactory() {
        super();  // Registrar la clase Config
        this.jwtParser = Jwts.parserBuilder()
                .setSigningKey("IVQR8hM2YZruFG7+bmbT6Of8Eb7FzP1FZwI80SM1ep4=".getBytes())  // Clave secreta para firmar/validar JWT
                .build();
    }
    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst("Authorization");

            if (token == null || !token.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            token = token.substring(7);  // Eliminar "Bearer " del token

            try {
                // Validar el token JWT
                Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
                Claims claims = claimsJws.getBody();

                // Agregar información del usuario a los encabezados
                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                        .header("X-User-Id", claims.getSubject())
                        .header("X-User-Roles", claims.get("roles", String.class))
                        .build();

                return chain.filter(exchange.mutate().request(modifiedRequest).build());
            } catch (JwtException e) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }
}
