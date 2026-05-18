//package com.example.Hostel_Management.service;
//
//import com.example.Hostel_Management.model.*;
//import com.example.Hostel_Management.repository.*;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class RoomRequestService {
//
//    private final RoomRequestRepository requestRepo;
//    private final RoomRepository roomRepo;
//
//    public RoomRequestService(
//            RoomRequestRepository requestRepo,
//            RoomRepository roomRepo) {
//        this.requestRepo = requestRepo;
//        this.roomRepo = roomRepo;
//    }
//
//    // ================= STUDENT REQUEST ROOM =================
//    public void requestRoom(Long roomId, User student) {
//
//        Room room = roomRepo.findById(roomId)
//                .orElseThrow(() -> new RuntimeException("Room not found"));
//
//        if (room.getStatus() == Room.RoomStatus.Occupied) {
//            throw new RuntimeException("Room already occupied");
//        }
//
//        if (requestRepo.existsByStudentAndRoom(student, room)) {
//            throw new RuntimeException("Already requested this room");
//        }
//
//        RoomRequest request = RoomRequest.builder()
//                .student(student)
//                .room(room)
//                .hostel(room.getHostel())
//                .status(RoomRequest.Status.PENDING)
//                .build();
//
//        requestRepo.save(request);
//    }
//
//    // ================= STUDENT VIEW MY REQUESTS =================
//    public List<RoomRequest> getMyRequests(String email) {
//        return requestRepo.findByStudentEmail(email);
//    }
//
//    // ================= ADMIN VIEW =================
//    public List<RoomRequest> getPendingRequests() {
//        return requestRepo.findByStatus(RoomRequest.Status.PENDING);
//    }
//
//    // ================= ADMIN APPROVE =================
//    @Transactional
//    public void approveRequest(Long requestId) {
//
//        RoomRequest req = requestRepo.findById(requestId)
//                .orElseThrow(() -> new RuntimeException("Request not found"));
//
//        if (req.getStatus() != RoomRequest.Status.PENDING) {
//            throw new RuntimeException("Already processed");
//        }
//
//        Room room = req.getRoom();
//        if (room.getStatus() == Room.RoomStatus.Occupied) {
//            throw new RuntimeException("Room already occupied");
//        }
//
//        // approve
//        req.setStatus(RoomRequest.Status.APPROVED);
//        room.setStatus(Room.RoomStatus.Occupied);
//
//        // reject others
//        List<RoomRequest> others =
//                requestRepo.findByRoomAndStatus(room, RoomRequest.Status.PENDING);
//
//        for (RoomRequest r : others) {
//            r.setStatus(RoomRequest.Status.REJECTED);
//        }
//
//        requestRepo.saveAll(others);
//        requestRepo.save(req);
//    }
//
//    // ================= ADMIN REJECT =================
//    public void rejectRequest(Long requestId) {
//
//        RoomRequest req = requestRepo.findById(requestId)
//                .orElseThrow(() -> new RuntimeException("Request not found"));
//
//        req.setStatus(RoomRequest.Status.REJECTED);
//        requestRepo.save(req);
//    }
//}


package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.*;
import com.example.Hostel_Management.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomRequestService {

    private final RoomRequestRepository requestRepo;
    private final RoomRepository roomRepo;

    public RoomRequestService(
            RoomRequestRepository requestRepo,
            RoomRepository roomRepo) {
        this.requestRepo = requestRepo;
        this.roomRepo = roomRepo;
    }

    // ================= STUDENT REQUEST NOTE =================
    @Transactional
    public void requestRoom(Long roomId, User student) {

        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() == Room.RoomStatus.Occupied) {
            throw new RuntimeException("Room already occupied");
        }

        if (requestRepo.existsByStudentAndRoom(student, room)) {
            throw new RuntimeException("Already requested this room");
        }

        RoomRequest request = RoomRequest.builder()
                .student(student)
                .room(room)
                .hostel(room.getHostel())
                .status(RoomRequest.Status.PENDING)
                .build();

        requestRepo.save(request);
    }

    // ================= STUDENT VIEW =================
    @Transactional
    public List<RoomRequest> getMyRequests(String email) {
        return requestRepo.findByStudentEmail(email);
    }

    // ================= ADMIN VIEW =================
    @Transactional
    public List<RoomRequest> getPendingRequests() {
        return requestRepo.findByStatus(RoomRequest.Status.PENDING);
    }

    // ================= ADMIN APPROVE =================
    @Transactional
    public void approveRequest(Long requestId) {

        RoomRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (req.getStatus() != RoomRequest.Status.PENDING) {
            throw new RuntimeException("Already processed");
        }

        Room room = req.getRoom();
        if (room.getStatus() == Room.RoomStatus.Occupied) {
            throw new RuntimeException("Room already occupied");
        }

        // approve selected
        req.setStatus(RoomRequest.Status.APPROVED);
        room.setStatus(Room.RoomStatus.Occupied);

        // reject others
        List<RoomRequest> others =
                requestRepo.findByRoomAndStatus(room, RoomRequest.Status.PENDING);

        for (RoomRequest r : others) {
            r.setStatus(RoomRequest.Status.REJECTED);
        }

        requestRepo.saveAll(others);
        requestRepo.save(req);
    }

    // ================= ADMIN REJECT =================
    @Transactional
    public void rejectRequest(Long requestId) {

        RoomRequest req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(RoomRequest.Status.REJECTED);
        requestRepo.save(req);
    }
}
