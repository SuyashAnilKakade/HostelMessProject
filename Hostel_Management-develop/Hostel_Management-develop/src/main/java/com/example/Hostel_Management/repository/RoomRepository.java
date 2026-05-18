package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHostel(Hostel hostel);
    List<Room> findByHostelId(Long hostelId);
}
