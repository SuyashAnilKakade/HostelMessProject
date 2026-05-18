package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.HolidayRequest;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.service.HolidayRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/student/holidays")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentHolidayController {

    private final HolidayRequestService service;

    @PostMapping
    public void submit(
            Authentication authentication,
            @RequestBody Map<String, String> body
    ) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        service.submit(
                userDetails.getUsername(),
                LocalDate.parse(body.get("fromDate")),
                LocalDate.parse(body.get("toDate")),
                body.get("reason")
        );
    }
    @GetMapping("/my")
    public List<HolidayRequest> myRequests(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return service.getMyRequests(userDetails.getUsername());
    }
}
