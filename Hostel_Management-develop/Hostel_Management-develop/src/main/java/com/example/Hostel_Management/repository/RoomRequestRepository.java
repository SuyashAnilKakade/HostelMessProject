package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {

    boolean existsByStudentAndRoom(User student, Room room);

    List<RoomRequest> findByStatus(RoomRequest.Status status);

    List<RoomRequest> findByRoomAndStatus(Room room, RoomRequest.Status status);

    List<RoomRequest> findByStudentEmail(String email);

    // ✅ FIX: return LIST, not Optional
    List<RoomRequest> findByStudentEmailAndStatus(
            String email,
            RoomRequest.Status status
    );
}
