package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Complaint;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudent(User student);
}
