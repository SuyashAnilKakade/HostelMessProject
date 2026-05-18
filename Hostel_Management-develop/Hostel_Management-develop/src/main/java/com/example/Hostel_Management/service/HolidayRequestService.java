package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.HolidayRequest;

import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.HolidayRequestRepository;
import com.example.Hostel_Management.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HolidayRequestService {

    private final HolidayRequestRepository repo;
    private final UserRepository userRepo; // inject UserRepository

    // STUDENT SUBMIT
    public void submit(String username, LocalDate fromDate, LocalDate toDate, String reason) {
        // fetch user by username/email
        User student = userRepo.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        HolidayRequest req = HolidayRequest.builder()
                .student(student)
                .fromDate(fromDate)
                .toDate(toDate)
                .reason(reason)
                .status(HolidayRequest.Status.PENDING)
                .build();

        repo.save(req);
    }

    // STUDENT VIEW
    public List<HolidayRequest> myRequests(User student) {
        return repo.findByStudent(student);
    }

    public List<HolidayRequest> getMyRequests(String email) {
        User student = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        return repo.findByStudent(student);
    }

    // ADMIN VIEW PENDING
    public List<HolidayRequest> pending() {
        return repo.findByStatus(HolidayRequest.Status.PENDING);
    }

    // ADMIN APPROVE / REJECT
    @Transactional
    public void updateStatus(Long id, HolidayRequest.Status status) {
        HolidayRequest req = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday request not found"));

        req.setStatus(status);
    }
}
