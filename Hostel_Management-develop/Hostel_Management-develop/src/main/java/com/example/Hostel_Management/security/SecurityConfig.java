package com.example.Hostel_Management.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    // ================= PASSWORD ENCODER =================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ================= AUTHENTICATION MANAGER =================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    // ================= SECURITY FILTER CHAIN =================
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // VERY IMPORTANT: allow browser preflight request
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // PUBLIC APIs
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()

                        // ADMIN APIs
                        .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                        // STUDENT APIs
                        .requestMatchers("/api/student/**").hasAuthority("ROLE_STUDENT")

                        // SHARED APIs
                        .requestMatchers("/api/messmenu/**")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT")

                        // ALL OTHER REQUESTS
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ================= CORS CONFIGURATION =================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // frontend URL
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));

        // allowed methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // IMPORTANT: allow all headers (helps multipart + Authorization)
        config.setAllowedHeaders(List.of("*"));

        // exposed headers
        config.setExposedHeaders(List.of("Authorization"));

        // credentials
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}