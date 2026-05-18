package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.service.RoomService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/rooms")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentRoomController {

    private final RoomService roomService;

    public StudentRoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // ✅ GET ROOMS BY HOSTEL (STUDENT VIEW)
    @GetMapping("/{hostelId}")
    public List<Room> getRooms(@PathVariable Long hostelId) {
        return roomService.getRoomsForStudents(hostelId);
    }
}
