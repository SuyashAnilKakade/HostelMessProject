package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.MessMenuItem;
import com.example.Hostel_Management.model.MessVote;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.MessMenuItemRepository;
import com.example.Hostel_Management.repository.MessVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MessMenuService {

    private final MessMenuItemRepository itemRepo;
    private final MessVoteRepository voteRepo;
    private final AttendanceService attendanceService;

    // ================= ADD THALI =================
    public void addThali(
            String name,
            String bhaji1,
            String bhaji2,
            String rice,
            String dal,
            String roti,
            String sweet,
            MultipartFile image,
            Long voteCount
    ) {
        try {
            String uploadDir = "uploads";
            Files.createDirectories(Paths.get(uploadDir));

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.write(filePath, image.getBytes());

            String imagePath = "/uploads/" + fileName;

            MessMenuItem item = MessMenuItem.builder()
                    .name(name)
                    .bhaji1(bhaji1)
                    .bhaji2(bhaji2)
                    .rice(rice)
                    .dal(dal)
                    .roti(roti)
                    .sweet(sweet)
                    .voteCount(voteCount)
                    .image(imagePath)
                    .build();

            itemRepo.save(item);

        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Image upload failed"
            );
        }
    }

    // ================= UPDATE THALI =================
    public void updateThali(
            Long id,
            String name,
            String bhaji1,
            String bhaji2,
            String rice,
            String dal,
            String roti,
            String sweet,
            MultipartFile image,
            Long voteCount
    ) {

        MessMenuItem item = itemRepo.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Thali not found"
                        )
                );

        item.setName(name);
        item.setBhaji1(bhaji1);
        item.setBhaji2(bhaji2);
        item.setRice(rice);
        item.setDal(dal);
        item.setRoti(roti);
        item.setSweet(sweet);
        item.setVoteCount(voteCount);

        try {

            // ✅ update image only if new image selected
            if (image != null && !image.isEmpty()) {

                String uploadDir = "uploads";
                Files.createDirectories(Paths.get(uploadDir));

                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

                Path filePath = Paths.get(uploadDir, fileName);

                Files.write(filePath, image.getBytes());

                String imagePath = "/uploads/" + fileName;

                item.setImage(imagePath);
            }

            itemRepo.save(item);

        } catch (IOException e) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Image upload failed"
            );
        }
    }

    // ================= ADMIN VIEW =================
    public List<MessMenuItem> adminView() {
        List<MessMenuItem> list = itemRepo.findAll();

        list.forEach(item ->
                item.setVoteCount(voteRepo.countByThali(item))
        );

        return list;
    }

    // ================= STUDENT VIEW =================
    public List<MessMenuItem> studentView() {
        return itemRepo.findAll();
    }

    // ================= VOTE + AUTO ATTENDANCE =================
    public void vote(User student, Long thaliId) {

        if (voteRepo.existsByStudent(student)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You already voted"
            );
        }

        MessMenuItem thali = itemRepo.findById(thaliId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Thali not found"
                        )
                );

        MessVote vote = new MessVote();
        vote.setStudent(student);
        vote.setThali(thali);

        voteRepo.save(vote);

        attendanceService.markPresent(student);
    }

    // ================= DELETE ALL =================
    public void deleteAll() {
        voteRepo.deleteAll();
        itemRepo.deleteAll();
    }

    // ================= HAS VOTED =================
    public boolean hasVoted(User student) {
        return voteRepo.existsByStudent(student);
    }
}