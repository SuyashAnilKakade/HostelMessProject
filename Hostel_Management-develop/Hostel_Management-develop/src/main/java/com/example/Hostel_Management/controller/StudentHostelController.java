package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.HostelService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/hostels")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentHostelController {

    private final HostelService hostelService;
    private final UserRepository userRepository;

    // ✅ Constructor Injection
    public StudentHostelController(
            HostelService hostelService,
            UserRepository userRepository) {
        this.hostelService = hostelService;
        this.userRepository = userRepository;
    }

    // ✅ STUDENT HOSTEL LIST
    @GetMapping
    public List<Hostel> getHostelsForStudent(
            @AuthenticationPrincipal UserDetails userDetails) {

        User student = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return hostelService.getHostelsForStudent(student);
    }
}
