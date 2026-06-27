package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Hostel;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.UserRepository;
import com.example.Hostel_Management.service.HostelService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/hostels")
@CrossOrigin(origins = "http://localhost:5173")
public class HostelController {

    private final HostelService hostelService;
    private final UserRepository userRepository;

    public HostelController(HostelService hostelService,
                            UserRepository userRepository) {
        this.hostelService = hostelService;
        this.userRepository = userRepository;
    }

    // ================= CREATE HOSTEL =================
    @PostMapping(consumes = "multipart/form-data")
    public Hostel createHostel(
            @RequestParam String name,
            @RequestParam String location,
            @RequestParam int totalRooms,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image,
            Authentication authentication
    ) throws Exception {

        System.out.println("========== CREATE HOSTEL API HIT ==========");
        System.out.println("Authentication object = " + authentication);

        if (authentication == null) {
            throw new RuntimeException("Authentication is null");
        }

        System.out.println("Logged in email from auth = " + authentication.getName());

        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found: " + authentication.getName()));

        System.out.println("Admin found in DB = " + admin.getEmail() + " | role = " + admin.getRole());

        String imagePath = null;

        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads";
            Files.createDirectories(Paths.get(uploadDir));

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.write(filePath, image.getBytes());
            imagePath = "/uploads/" + fileName;
        }

        Hostel hostel = Hostel.builder()
                .name(name)
                .location(location)
                .totalRooms(totalRooms)
                .allottedRooms(0)
                .availableRooms(totalRooms)
                .description(description)
                .image(imagePath)
                .admin(admin)
                .build();

        System.out.println("Saving hostel = " + hostel.getName());

        Hostel saved = hostelService.createHostel(hostel);

        System.out.println("Hostel saved successfully with id = " + saved.getId());

        return saved;
    }

    // ================= GET HOSTELS =================
    @GetMapping
    public List<Hostel> getAdminHostels(Authentication authentication) {

        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return hostelService.getHostelsByAdmin(admin);
    }

    // ================= DELETE HOSTEL =================
    @DeleteMapping("/{hostelId}")
    public String deleteHostel(
            @PathVariable Long hostelId,
            Authentication authentication
    ) {

        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        hostelService.deleteHostel(hostelId, admin);

        return "Hostel deleted successfully";
    }

    // ================= UPDATE HOSTEL =================
    @PutMapping(value = "/{hostelId}", consumes = "multipart/form-data")
    public Hostel updateHostel(
            @PathVariable Long hostelId,
            @RequestParam String name,
            @RequestParam String location,
            @RequestParam int totalRooms,
            @RequestParam int allottedRooms,
            @RequestParam int availableRooms,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image,
            Authentication authentication
    ) throws Exception {

        User admin = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Hostel hostel = hostelService.getHostelById(hostelId, admin);

        hostel.setName(name);
        hostel.setLocation(location);
        hostel.setTotalRooms(totalRooms);
        hostel.setAllottedRooms(allottedRooms);
        hostel.setAvailableRooms(availableRooms);
        hostel.setDescription(description);

        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads";
            Files.createDirectories(Paths.get(uploadDir));

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.write(filePath, image.getBytes());
            hostel.setImage("/uploads/" + fileName);
        }

        return hostelService.createHostel(hostel);
    }
}