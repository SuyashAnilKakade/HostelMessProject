package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.NightOutRequest;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.service.NightOutRequestService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student/nightout")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentNightOutController {

    private final NightOutRequestService service;

    public StudentNightOutController(NightOutRequestService service) {
        this.service = service;
    }

    @PostMapping
    public void submit(
            Authentication authentication,
            @RequestBody Map<String, String> body
    ) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        service.submitRequest(
                userDetails.getUsername(),
                LocalDate.parse(body.get("date")),
                LocalTime.parse(body.get("returnTime")),
                body.get("reason")
        );
    }

    @GetMapping("/my")
    public List<NightOutRequest> myRequests(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return service.getMyRequests(userDetails.getUsername());
    }
}
