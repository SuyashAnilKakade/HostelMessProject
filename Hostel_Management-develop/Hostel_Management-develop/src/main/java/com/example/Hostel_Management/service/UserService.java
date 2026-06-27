package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.security.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // ================= REGISTER =================
    @Transactional
    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Normalize role safely
        String role = user.getRole();

        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("Role is required");
        }

        role = role.trim().toUpperCase();

        // Convert ADMIN -> ROLE_ADMIN
        // Convert STUDENT -> ROLE_STUDENT
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        // Allow only valid roles
        if (!role.equals("ROLE_ADMIN") && !role.equals("ROLE_STUDENT")) {
            throw new RuntimeException("Invalid role: " + role);
        }

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        log.info("Saving user with role = {}", user.getRole());

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    @Transactional(readOnly = true)
    public Map<String, Object> login(User user) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid email or password");
        }

        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String role = dbUser.getRole();

        // Safety normalization for old DB records
        if (role != null) {
            role = role.trim().toUpperCase();
            if (!role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }
        } else {
            throw new RuntimeException("User role is missing");
        }

        // Generate JWT token with normalized role
        String token = jwtUtil.generateToken(
                dbUser.getEmail(),
                role,
                dbUser.getName()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);
        response.put("name", dbUser.getName());
        response.put("email", dbUser.getEmail());

        return response;
    }
}