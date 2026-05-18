package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.HostelRepository;
import com.example.Hostel_Management.repository.RoomRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HostelService {

    private final HostelRepository hostelRepository;
    private final RoomRequestRepository roomRequestRepository;

    public HostelService(
            HostelRepository hostelRepository,
            RoomRequestRepository roomRequestRepository) {
        this.hostelRepository = hostelRepository;
        this.roomRequestRepository = roomRequestRepository;
    }

    // ================= ADMIN =================
    public Hostel createHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    public List<Hostel> getHostelsByAdmin(User admin) {
        return hostelRepository.findByAdmin(admin);
    }

    public Hostel getHostelById(Long hostelId, User admin) {
        return hostelRepository.findByIdAndAdmin(hostelId, admin)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found or unauthorized"));
    }

    public void deleteHostel(Long hostelId, User admin) {
        Hostel hostel = hostelRepository.findByIdAndAdmin(hostelId, admin)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found or unauthorized"));
        hostelRepository.delete(hostel);
    }

    // ================= STUDENT =================
    public List<Hostel> getHostelsForStudent(User student) {

        List<RoomRequest> approvedRequests =
                roomRequestRepository.findByStudentEmailAndStatus(
                        student.getEmail(),
                        RoomRequest.Status.APPROVED
                );

        // ✅ If approved → show ONLY allocated hostel(s)
        if (!approvedRequests.isEmpty()) {
            return approvedRequests.stream()
                    .map(RoomRequest::getHostel)
                    .distinct()
                    .collect(Collectors.toList());
        }

        // ✅ Otherwise → show all hostels
        return hostelRepository.findAll();
    }
}