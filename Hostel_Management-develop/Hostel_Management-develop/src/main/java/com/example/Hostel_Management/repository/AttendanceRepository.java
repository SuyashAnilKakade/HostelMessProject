package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.Attendance;
import com.example.Hostel_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByStudentAndDate(User student, LocalDate date);

    Optional<Attendance> findByStudentAndDate(User student, LocalDate date);

    List<Attendance> findByDate(LocalDate date);

    // 🔥 Needed for history
    List<Attendance> findByStudentOrderByDateDesc(User student);
}
