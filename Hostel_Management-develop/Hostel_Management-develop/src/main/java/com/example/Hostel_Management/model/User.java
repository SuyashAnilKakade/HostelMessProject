package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USERS")
@Getter
@Setter
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

    // Always ROLE_ADMIN / ROLE_STUDENT
    @Column(name = "ROLE", nullable = false)
    private String role;

    @Column(name = "NAME")
    private String name;

    // ================= STUDENT ALLOCATION =================

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "HOSTEL_ID")
    @JsonIgnoreProperties({"admin"})
    private Hostel hostel;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ROOM_ID")
    @JsonIgnoreProperties({"hostel"})
    private Room room;
}