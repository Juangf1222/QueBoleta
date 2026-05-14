package com.queboleta.config;

import com.queboleta.entity.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    // 24 horas
    private static final long JWT_EXPIRATION = 1000 * 60 * 60 * 24;

    // =========================================
    // OBTENER CLAVE
    // =========================================
    private Key obtenerClave() {

        return Keys.hmacShaKeyFor(
                jwtSecret.getBytes()
        );
    }

    // =========================================
    // GENERAR TOKEN
    // =========================================
    public String generarToken(Usuario usuario) {

        Map<String, Object> claims = new HashMap<>();

        claims.put(
                "rol",
                usuario.getRol().name()
        );

        return Jwts.builder()

                .setClaims(claims)

                .setSubject(
                        usuario.getCorreo()
                )

                .setIssuedAt(
                        new Date(System.currentTimeMillis())
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + JWT_EXPIRATION
                        )
                )

                .signWith(
                        obtenerClave(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // =========================================
    // OBTENER CORREO DEL TOKEN
    // =========================================
    public String obtenerCorreoDelToken(
            String token) {

        return obtenerClaims(token)
                .getSubject();
    }

    // =========================================
    // VALIDAR TOKEN
    // =========================================
    public boolean validarToken(
            String token,
            UserDetails userDetails) {

        final String correo =
                obtenerCorreoDelToken(token);

        return correo.equals(
                userDetails.getUsername()
        ) && !tokenExpirado(token);
    }

    // =========================================
    // VERIFICAR EXPIRACIÓN
    // =========================================
    private boolean tokenExpirado(
            String token) {

        return obtenerClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // =========================================
    // EXTRAER CLAIMS
    // =========================================
    private Claims obtenerClaims(
            String token) {

        return Jwts.parserBuilder()

                .setSigningKey(
                        obtenerClave()
                )

                .build()

                .parseClaimsJws(token)

                .getBody();
    }
}