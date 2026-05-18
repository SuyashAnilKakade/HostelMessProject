package com.example.Hostel_Management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    // ✅ IMPORTANT: ALWAYS STORE ROLE_ADMIN / ROLE_STUDENT
    @Column(name = "ROLE", nullable = false)
    private String role;

    @Column(name = "NAME")
    private String name;

    // ================= STUDENT ALLOCATION =================

    @ManyToOne
    @JoinColumn(name = "HOSTEL_ID")
    private Hostel hostel;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;
}