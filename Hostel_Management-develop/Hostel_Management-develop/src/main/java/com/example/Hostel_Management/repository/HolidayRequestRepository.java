package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.HolidayRequest;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HolidayRequestRepository extends JpaRepository<HolidayRequest, Long> {

    List<HolidayRequest> findByStudent(User student);

    List<HolidayRequest> findByStatus(HolidayRequest.Status status);
}
