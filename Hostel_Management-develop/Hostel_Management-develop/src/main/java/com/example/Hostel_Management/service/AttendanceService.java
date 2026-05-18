package com.example.Hostel_Management.service;

import com.example.Hostel_Management.model.Attendance;
import com.example.Hostel_Management.model.User;
import com.example.Hostel_Management.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;

    // ✅ Called when student votes for mess menu
    public void markPresent(User student) {

        LocalDate today = LocalDate.now();

        if (!attendanceRepo.existsByStudentAndDate(student, today)) {
            Attendance attendance = Attendance.builder()
                    .student(student)
                    .date(today)
                    .status(Attendance.Status.PRESENT)
                    .build();

            attendanceRepo.save(attendance);
        }
    }

    // ✅ Student - today
    public Attendance getToday(User student) {
        return attendanceRepo
                .findByStudentAndDate(student, LocalDate.now())
                .orElse(null);
    }

    // ✅ Student - history (🔥 THIS WAS MISSING)
    public List<Attendance> getHistory(User student) {
        return attendanceRepo.findByStudentOrderByDateDesc(student);
    }

    // ✅ Admin - today
    public List<Attendance> getTodayAttendance() {
        return attendanceRepo.findByDate(LocalDate.now());
    }
}
