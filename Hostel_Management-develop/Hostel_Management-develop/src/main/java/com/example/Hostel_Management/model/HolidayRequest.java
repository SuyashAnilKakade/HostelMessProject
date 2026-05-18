package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "holiday_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HolidayRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ONLY student reference (same as NightOut)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "student_id")
    @JsonIgnoreProperties({"password", "role"})
    private User student;

    private LocalDate fromDate;
    private LocalDate toDate;

    @Column(length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}
