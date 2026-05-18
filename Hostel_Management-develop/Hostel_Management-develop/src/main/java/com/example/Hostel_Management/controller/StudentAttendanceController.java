package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Attendance;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/attendance")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentAttendanceController {

    private final AttendanceService attendanceService;
    private final UserRepository userRepository;

    private User getStudent(Authentication auth) {

        if (auth == null || !(auth.getPrincipal() instanceof UserDetails userDetails)) {
            throw new RuntimeException("Unauthorized");
        }

        return userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @GetMapping("/today")
    public Attendance getToday(Authentication auth) {
        return attendanceService.getToday(getStudent(auth));
    }

    @GetMapping("/history")
    public List<Attendance> history(Authentication auth) {
        return attendanceService.getHistory(getStudent(auth));
    }
}
