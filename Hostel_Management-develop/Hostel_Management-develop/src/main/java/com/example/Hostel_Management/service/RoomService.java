package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.HostelRepository;
import com.example.Hostel_Management.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;

    public RoomService(RoomRepository roomRepository,
                       HostelRepository hostelRepository) {
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
    }

    // ✅ ADD ROOM (ADMIN + OWN HOSTEL CHECK)
    public Room addRoom(Long hostelId, Room room, User admin) {

        Hostel hostel = hostelRepository
                .findByIdAndAdmin(hostelId, admin)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found or unauthorized access"));

        room.setHostel(hostel);
        room.setStatus(Room.RoomStatus.Available);

        return roomRepository.save(room);
    }
    // ================= STUDENT: GET ROOMS =================
    public List<Room> getRoomsForStudents(Long hostelId) {
        return roomRepository.findByHostelId(hostelId);
    }

    // ✅ GET ROOMS FOR HOSTEL (ADMIN ONLY)
    public List<Room> getRoomsByHostel(Long hostelId, User admin) {

        Hostel hostel = hostelRepository
                .findByIdAndAdmin(hostelId, admin)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found or unauthorized access"));

        return roomRepository.findByHostel(hostel);
    }
}
