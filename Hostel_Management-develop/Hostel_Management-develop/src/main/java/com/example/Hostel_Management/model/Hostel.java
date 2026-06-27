package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hostels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    private int totalRooms;
    private int allottedRooms;
    private int availableRooms;

    @Column(length = 500)
    private String description;

    private String image;

    // ✅ While sending hostel JSON, don't send nested hostel/room/password again from admin
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id")
    @JsonIgnoreProperties({"password", "hostel", "room"})
    private User admin;
}