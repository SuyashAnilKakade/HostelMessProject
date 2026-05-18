package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.HolidayRequest;
import com.example.Hostel_Management.service.HolidayRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/holidays")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminHolidayController {

    private final HolidayRequestService service;

    @GetMapping
    public List<HolidayRequest> pending() {
        return service.pending();
    }

    @PutMapping("/{id}/approve")
    public void approve(@PathVariable Long id) {
        service.updateStatus(id, HolidayRequest.Status.APPROVED);
    }

    @PutMapping("/{id}/reject")
    public void reject(@PathVariable Long id) {
        service.updateStatus(id, HolidayRequest.Status.REJECTED);
    }
}
