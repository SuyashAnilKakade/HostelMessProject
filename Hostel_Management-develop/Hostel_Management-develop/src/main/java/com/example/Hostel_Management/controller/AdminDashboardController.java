package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.repository.HostelRepository;
import com.example.Hostel_Management.repository.RoomRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;

    public AdminDashboardController(
            HostelRepository hostelRepository,
            RoomRepository roomRepository) {
        this.hostelRepository = hostelRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();
        data.put("totalHostels", hostelRepository.count());
        data.put("totalRooms", roomRepository.count());
        data.put("occupiedRooms",
                roomRepository.findAll().stream()
                        .filter(r -> r.getStatus() == Room.RoomStatus.Occupied)
                        .count()
        );
        data.put("pendingRequests", 0);

        return data;
    }
}
