package com.saferoute.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;

    public JwtService(@Value("${JWT_SECRET:${jwt.secret}}") String secret) {
        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException(
                "JWT secret must be at least 32 characters long"
            );
        }

        this.key = Keys.hmacShaKeyFor(
            secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(String email) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
            .subject(email)
            .issuedAt(new Date(now))
            .expiration(new Date(now + 2 * 60 * 60 * 1000L))
            .signWith(key)
            .compact();
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            return getClaims(token).getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
