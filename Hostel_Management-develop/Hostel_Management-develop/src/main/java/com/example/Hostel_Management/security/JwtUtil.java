package com.example.Hostel_Management.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    // 🔐 Secret key (must be 256-bit safe length)
    private static final String SECRET =
            "THIS_IS_A_VERY_LONG_SECRET_KEY_FOR_JWT_256_BIT_SECURITY";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ================= GENERATE TOKEN =================
    public String generateToken(String email, String role, String name) {

        Map<String, Object> claims = new HashMap<>();

        // ✅ Always store consistent role format (ROLE_ADMIN / ROLE_STUDENT)
        claims.put("role", role);

        // Optional extra info
        claims.put("name", name);

        // (Optional but helpful for frontend debugging)
        claims.put("authorities", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 100)
                )
                .signWith(key)
                .compact();
    }

    // ================= EXTRACT EMAIL =================
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ================= EXTRACT ROLE =================
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ================= EXTRACT NAME =================
    public String extractName(String token) {
        return extractAllClaims(token).get("name", String.class);
    }

    // ================= VALIDATE TOKEN =================
    public boolean validateToken(String token, UserDetails userDetails) {
        return extractEmail(token).equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // ================= CHECK EXPIRATION =================
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // ================= PARSE CLAIMS =================
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}