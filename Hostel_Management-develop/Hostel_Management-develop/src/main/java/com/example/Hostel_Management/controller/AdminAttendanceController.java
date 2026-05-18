package com.example.Hostel_Management.controller;

import com.example.Hostel_Management.model.Attendance;
import com.example.Hostel_Management.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import lombok.Data;

import java.util.List;

@RestController
@RequestMapping("/api/admin/attendance")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminAttendanceController {

    private final AttendanceService attendanceService;



    @GetMapping("/today")
    public List<Attendance> today() {
        return attendanceService.getTodayAttendance();
    }
}
