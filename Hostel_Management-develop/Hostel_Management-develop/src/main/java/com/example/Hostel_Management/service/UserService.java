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

        // ✅ Normalize role to match Spring Security format
        String role = user.getRole().toUpperCase();

        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        user.setRole(role);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ================= LOGIN =================
    @Transactional(readOnly = true)
    public Map<String, Object> login(User user) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(), user.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid email or password");
        }

        User dbUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT token
        String token = jwtUtil.generateToken(
                dbUser.getEmail(),
                dbUser.getRole(),
                dbUser.getName()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", dbUser.getRole());

        return response;
    }
}