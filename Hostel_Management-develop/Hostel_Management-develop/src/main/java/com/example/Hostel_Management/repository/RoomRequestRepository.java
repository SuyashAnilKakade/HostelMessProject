package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {

    // student already requested this room?
    boolean existsByStudentAndRoom(User student, Room room);

    // all pending requests
    List<RoomRequest> findByStatus(RoomRequest.Status status);

    // pending/approved/rejected requests of a room
    List<RoomRequest> findByRoomAndStatus(Room room, RoomRequest.Status status);

    // student's all requests
    List<RoomRequest> findByStudentEmail(String email);

    // student's requests by status
    List<RoomRequest> findByStudentEmailAndStatus(
            String email,
            RoomRequest.Status status
    );

    // 🔥 IMPORTANT: count approved students in a room
    long countByRoomAndStatus(Room room, RoomRequest.Status status);

    // optional but useful if needed later
    List<RoomRequest> findByRoom(Room room);
}