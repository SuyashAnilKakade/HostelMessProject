package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.MessMenuItem;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.MessMenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentMessController {

    private final MessMenuService service;
    private final UserRepository userRepository;

    public StudentMessController(
            MessMenuService service,
            UserRepository userRepository
    ) {
        this.service = service;
        this.userRepository = userRepository;
    }

    // ================= VIEW THALI =================
    @GetMapping("/messmenu")
    public List<MessMenuItem> getThaliMenu() {
        log.info("Student viewing thali menu");
        return service.studentView();
    }
    @GetMapping("/has-voted")
    public boolean hasVoted(Authentication authentication) {

        UserDetails ud = (UserDetails) authentication.getPrincipal();
        String email = ud.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.hasVoted(user);
    }
    // ================= VOTE FOR ONE THALI =================
    @PostMapping("/vote")
    public void vote(
            Authentication authentication,
            @RequestBody VoteRequest req
    ) {
        UserDetails ud = (UserDetails) authentication.getPrincipal();
        String email = ud.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ ONE thali ID ONLY
        service.vote(user, req.thaliId());
    }

    // ✅ NO list, NO itemId
    record VoteRequest(Long thaliId) {}

}
