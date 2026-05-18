package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

    // ✅ Get all hostels of a specific admin
    List<Hostel> findByAdmin(User admin);

    // ✅ Security-safe fetch
    Optional<Hostel> findByIdAndAdmin(Long id, User admin);
}
