package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.NightOutRequest;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NightOutRequestRepository
        extends JpaRepository<NightOutRequest, Long> {

    List<NightOutRequest> findByStudent(User student);

    List<NightOutRequest> findByStatus(NightOutRequest.Status status);
}
