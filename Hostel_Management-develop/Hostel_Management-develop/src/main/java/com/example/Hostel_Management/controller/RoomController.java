package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.RoomService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/rooms")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final RoomService roomService;
    private final UserRepository userRepository;

    public RoomController(RoomService roomService,
                          UserRepository userRepository) {
        this.roomService = roomService;
        this.userRepository = userRepository;
    }

    // ✅ ADD ROOM
    @PostMapping("/{hostelId}")
    public Room addRoom(
            @PathVariable Long hostelId,
            @RequestBody Room room,
            Authentication authentication
    ) {
        User admin = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return roomService.addRoom(hostelId, room, admin);
    }

    // ✅ GET ROOMS
    @GetMapping("/{hostelId}")
    public List<Room> getRooms(
            @PathVariable Long hostelId,
            Authentication authentication
    ) {
        User admin = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return roomService.getRoomsByHostel(hostelId, admin);
    }
}
