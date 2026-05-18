package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.RoomRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/room-requests")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentRoomRequestController {

    private final RoomRequestService roomRequestService;
    private final UserRepository userRepository;

    public StudentRoomRequestController(
            RoomRequestService roomRequestService,
            UserRepository userRepository) {
        this.roomRequestService = roomRequestService;
        this.userRepository = userRepository;
    }

    // ✅ REQUEST ROOM
    @PostMapping("/{roomId}")
    public ResponseEntity<String> requestRoom(
            @PathVariable Long roomId,
            @AuthenticationPrincipal UserDetails userDetails) {

        User student = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        roomRequestService.requestRoom(roomId, student);
        return ResponseEntity.ok("Room request sent successfully");
    }

    // ✅ FETCH MY REQUESTS (USED BY FRONTEND)
    @GetMapping("/my")
    public List<RoomRequest> myRequests(
            @AuthenticationPrincipal UserDetails userDetails) {

        return roomRequestService.getMyRequests(
                userDetails.getUsername()
        );
    }
}
