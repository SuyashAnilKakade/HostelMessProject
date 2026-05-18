package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Complaint;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.service.ComplaintService;
import com.example.Hostel_Management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student/complaints")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentComplaintController {

    private final ComplaintService complaintService;
    private final UserService userService;

    // STUDENT SUBMIT COMPLAINT
    @PostMapping
    public void submitComplaint(
            Authentication authentication,
            @RequestBody Map<String, String> body
    ) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        String issueType = body.getOrDefault("issueType", "General");
        String description = body.get("description");

        // call service
        complaintService.submit(email, issueType, description);
    }

    // STUDENT VIEW OWN COMPLAINTS
    @GetMapping("/my")
    public List<Complaint> myComplaints(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        return complaintService.getComplaintsByStudentEmail(email);
    }
}
