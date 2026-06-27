package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.Room;
import com.example.Hostel_Management.model.RoomRequest;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.RoomRepository;
import com.example.Hostel_Management.repository.RoomRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomRequestService {

    private final RoomRequestRepository requestRepo;
    private final RoomRepository roomRepo;

    public RoomRequestService(
            RoomRequestRepository requestRepo,
            RoomRepository roomRepo
    ) {
        this.requestRepo = requestRepo;
        this.roomRepo = roomRepo;
    }

    // ================= STUDENT REQUEST ROOM =================
    @Transactional
    public void requestRoom(Long roomId, User student) {

        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // 1) student should not request same room twice
        if (requestRepo.existsByStudentAndRoom(student, room)) {
            throw new RuntimeException("You already requested this room");
        }

        // 2) check approved students count
        long approvedCount = requestRepo.countByRoomAndStatus(
                room,
                RoomRequest.Status.APPROVED
        );

        // 3) if room full, block request
        if (approvedCount >= room.getCapacity()) {
            room.setStatus(Room.RoomStatus.Occupied);
            roomRepo.save(room);
            throw new RuntimeException("Room is already full");
        }

        // 4) if still seats available -> allow request
        RoomRequest request = RoomRequest.builder()
                .student(student)
                .room(room)
                .hostel(room.getHostel())
                .status(RoomRequest.Status.PENDING)
                .build();

        requestRepo.save(request);

        // keep status Available while seats remain
        room.setStatus(Room.RoomStatus.Available);
        roomRepo.save(room);
    }

    // ================= STUDENT VIEW MY REQUESTS =================
    @Transactional
    public List<RoomRequest> getMyRequests(String email) {
        return requestRepo.findByStudentEmail(email);
    }

    // ================= ADMIN VIEW PENDING REQUESTS =================
    @Transactional
    public List<RoomRequest> getPendingRequests() {
        return requestRepo.findByStatus(RoomRequest.Status.PENDING);
    }

    // ================= ADMIN APPROVE REQUEST =================
    @Transactional
    public void approveRequest(Long requestId) {

        RoomRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (req.getStatus() != RoomRequest.Status.PENDING) {
            throw new RuntimeException("Request already processed");
        }

        Room room = req.getRoom();

        // count already approved students in this room
        long approvedCount = requestRepo.countByRoomAndStatus(
                room,
                RoomRequest.Status.APPROVED
        );

        // if already full, reject this request
        if (approvedCount >= room.getCapacity()) {
            req.setStatus(RoomRequest.Status.REJECTED);
            requestRepo.save(req);

            room.setStatus(Room.RoomStatus.Occupied);
            roomRepo.save(room);

            throw new RuntimeException("Room is already full");
        }

        // approve current request
        req.setStatus(RoomRequest.Status.APPROVED);
        requestRepo.save(req);

        // recount after approval
        long newApprovedCount = requestRepo.countByRoomAndStatus(
                room,
                RoomRequest.Status.APPROVED
        );

        // if room becomes full after this approval
        if (newApprovedCount >= room.getCapacity()) {
            room.setStatus(Room.RoomStatus.Occupied);
            roomRepo.save(room);

            // reject only remaining pending requests now
            List<RoomRequest> pendingRequests =
                    requestRepo.findByRoomAndStatus(room, RoomRequest.Status.PENDING);

            for (RoomRequest pending : pendingRequests) {
                pending.setStatus(RoomRequest.Status.REJECTED);
            }

            requestRepo.saveAll(pendingRequests);
        } else {
            // still seats available
            room.setStatus(Room.RoomStatus.Available);
            roomRepo.save(room);
        }
    }

    // ================= ADMIN REJECT REQUEST =================
    @Transactional
    public void rejectRequest(Long requestId) {

        RoomRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (req.getStatus() != RoomRequest.Status.PENDING) {
            throw new RuntimeException("Request already processed");
        }

        req.setStatus(RoomRequest.Status.REJECTED);
        requestRepo.save(req);

        // after rejection, room may still remain available if not full
        Room room = req.getRoom();

        long approvedCount = requestRepo.countByRoomAndStatus(
                room,
                RoomRequest.Status.APPROVED
        );

        if (approvedCount >= room.getCapacity()) {
            room.setStatus(Room.RoomStatus.Occupied);
        } else {
            room.setStatus(Room.RoomStatus.Available);
        }

        roomRepo.save(room);
    }
}