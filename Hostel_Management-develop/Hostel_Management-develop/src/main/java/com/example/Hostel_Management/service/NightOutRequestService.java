package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.*;
import com.example.Hostel_Management.repository.NightOutRequestRepository;
import com.example.Hostel_Management.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class NightOutRequestService {

    private final NightOutRequestRepository repo;
    private final UserRepository userRepository;

    public NightOutRequestService(
            NightOutRequestRepository repo,
            UserRepository userRepository
    ) {
        this.repo = repo;
        this.userRepository = userRepository;
    }

    // ================= STUDENT SUBMIT =================
    public void submitRequest(
            String email,
            LocalDate date,
            LocalTime returnTime,
            String reason
    ) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        NightOutRequest request = NightOutRequest.builder()
                .student(student)   // ✅ ONLY student
                .date(date)
                .returnTime(returnTime)
                .reason(reason)
                .status(NightOutRequest.Status.PENDING)
                .build();

        repo.save(request);
    }

    // ================= STUDENT VIEW =================
    public List<NightOutRequest> getMyRequests(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        return repo.findByStudent(student);
    }

    // ================= ADMIN VIEW =================
    public List<NightOutRequest> getPendingRequests() {
        return repo.findByStatus(NightOutRequest.Status.PENDING);
    }

    // ================= ADMIN APPROVE =================
    @Transactional
    public void approve(Long id) {
        NightOutRequest req = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(NightOutRequest.Status.APPROVED);
    }

    // ================= ADMIN REJECT =================
    @Transactional
    public void reject(Long id) {
        NightOutRequest req = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(NightOutRequest.Status.REJECTED);
    }
}
