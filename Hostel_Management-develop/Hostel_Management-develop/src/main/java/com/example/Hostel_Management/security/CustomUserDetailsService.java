package com.example.Hostel_Management.security;

import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        log.info("[CustomUserDetailsService] Loading user: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + email)
                );

        String role = user.getRole();

        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("User role is not assigned");
        }

        // Normalize role from DB
        role = role.trim().toUpperCase();

        // Convert ADMIN -> ROLE_ADMIN if old data exists
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        log.info("[CustomUserDetailsService] User role = {}", role);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}