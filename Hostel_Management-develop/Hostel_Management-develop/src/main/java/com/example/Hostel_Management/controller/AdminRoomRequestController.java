package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.service.RoomRequestService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/room-requests")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminRoomRequestController {

    private final RoomRequestService roomRequestService;

    public AdminRoomRequestController(RoomRequestService roomRequestService) {
        this.roomRequestService = roomRequestService;
    }

    // ✅ View all pending requests
    @GetMapping
    public List<RoomRequest> getPendingRequests() {
        return roomRequestService.getPendingRequests();
    }

    // ✅ Approve request
    @PostMapping("/{id}/approve")
    public void approveRequest(@PathVariable Long id) {
        roomRequestService.approveRequest(id);
    }

    // ❌ Reject request
    @PostMapping("/{id}/reject")
    public void rejectRequest(@PathVariable Long id) {
        roomRequestService.rejectRequest(id);
    }
}