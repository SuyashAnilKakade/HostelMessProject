package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.MessMenuItem;
import com.example.Hostel_Management.service.MessMenuService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/api/admin/messmenu")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminMessMenuController {

    private final MessMenuService service;

    public AdminMessMenuController(MessMenuService service) {
        this.service = service;
    }

    // ================= GET ALL THALIS =================
    @GetMapping
    public List<MessMenuItem> getAllThalis() {
        return service.adminView();
    }

    // ================= ADD THALI =================
    @PostMapping(consumes = "multipart/form-data")
    public void addThali(
            @RequestParam String name,
            @RequestParam String bhaji1,
            @RequestParam String bhaji2,
            @RequestParam String rice,
            @RequestParam String dal,
            @RequestParam String roti,
            @RequestParam String sweet,
            @RequestParam Long voteCount,
            @RequestParam MultipartFile image
    ) {
        service.addThali(
                name, bhaji1, bhaji2, rice, dal, roti, sweet, image, voteCount
        );
    }

    // ================= UPDATE THALI =================
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public void updateThali(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String bhaji1,
            @RequestParam String bhaji2,
            @RequestParam String rice,
            @RequestParam String dal,
            @RequestParam String roti,
            @RequestParam String sweet,
            @RequestParam Long voteCount,
            @RequestParam(required = false) MultipartFile image
    ) {
        service.updateThali(
                id,
                name,
                bhaji1,
                bhaji2,
                rice,
                dal,
                roti,
                sweet,
                image,
                voteCount
        );
    }

    // ================= DELETE ALL =================
    @DeleteMapping
    public void deleteAll() {
        service.deleteAll();
    }
}