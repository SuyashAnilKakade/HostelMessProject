package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "nightout_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NightOutRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ONLY student reference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "student_id")
    @JsonIgnoreProperties({"password", "role"})
    private User student;

    private LocalDate date;
    private LocalTime returnTime;
    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}
