package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.NightOutRequest;
import com.example.Hostel_Management.service.NightOutRequestService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/nightout")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminNightOutController {

    private final NightOutRequestService service;

    public AdminNightOutController(NightOutRequestService service) {
        this.service = service;
    }

    // VIEW ALL PENDING
    @GetMapping
    public List<NightOutRequest> getPending() {
        return service.getPendingRequests();
    }

    // APPROVE
    @PostMapping("/{id}/approve")
    public void approve(@PathVariable Long id) {
        service.approve(id);
    }

    // REJECT
    @PostMapping("/{id}/reject")
    public void reject(@PathVariable Long id) {
        service.reject(id);
    }
}
