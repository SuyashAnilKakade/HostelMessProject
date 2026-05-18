package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessVoteRepository extends JpaRepository<MessVote, Long> {

    boolean existsByStudent(User student);

    long countByThali(MessMenuItem thali);
}