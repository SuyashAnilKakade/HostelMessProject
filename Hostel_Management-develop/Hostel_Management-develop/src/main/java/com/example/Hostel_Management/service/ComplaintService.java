package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.Complaint;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.ComplaintRepository;
import com.example.Hostel_Management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    // STUDENT SUBMIT BY EMAIL
    public void submit(String email, String issueType, String description) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Complaint complaint = Complaint.builder()
                .student(student)
                //.title(issueType)
                .description(description)
                .status(Complaint.Status.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        complaintRepository.save(complaint);
    }

    // STUDENT VIEW OWN COMPLAINTS BY EMAIL
    public List<Complaint> getComplaintsByStudentEmail(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return complaintRepository.findByStudent(student);
    }

    // ADMIN VIEW ALL
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // ADMIN UPDATE STATUS
    public Complaint updateStatus(Long id, Complaint.Status status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }
}
