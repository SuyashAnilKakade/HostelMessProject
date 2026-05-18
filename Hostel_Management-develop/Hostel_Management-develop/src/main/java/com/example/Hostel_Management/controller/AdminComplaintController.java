package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Complaint;
import com.example.Hostel_Management.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/complaints")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminComplaintController {

    private final ComplaintService complaintService;

    // GET ALL COMPLAINTS
    @GetMapping
    public List<Complaint> allComplaints() {
        return complaintService.getAllComplaints();
    }

    // APPROVE / MARK AS RESOLVED
    @PutMapping("/{id}/approve")
    public void approve(@PathVariable Long id) {
        complaintService.updateStatus(id, Complaint.Status.RESOLVED);
    }

    // REJECT COMPLAINT
    @PutMapping("/{id}/reject")
    public void reject(@PathVariable Long id) {
        complaintService.updateStatus(id, Complaint.Status.REJECTED);
    }
}
