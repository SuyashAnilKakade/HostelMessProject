package com.example.Hostel_Management.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil,
                     UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();
        String method = request.getMethod();

        System.out.println("\n========== JWT FILTER ==========");
        System.out.println("Request Path   : " + path);
        System.out.println("Request Method : " + method);

        // allow OPTIONS
        if (HttpMethod.OPTIONS.matches(method)) {
            System.out.println("OPTIONS request allowed");
            filterChain.doFilter(request, response);
            return;
        }

        // public endpoints
        if (path.startsWith("/api/auth") || path.startsWith("/uploads")) {
            System.out.println("Public endpoint, skipping JWT");
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization header = " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer token found");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token);

            System.out.println("Token email = " + email);
            System.out.println("Token role  = " + role);

            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                System.out.println("UserDetails username = " + userDetails.getUsername());
                System.out.println("UserDetails authorities = " + userDetails.getAuthorities());

                if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println("Authentication set successfully");
                } else {
                    System.out.println("Token validation failed");
                }
            }

        } catch (Exception e) {
            System.out.println("JWT FILTER ERROR = " + e.getMessage());
            e.printStackTrace();
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}