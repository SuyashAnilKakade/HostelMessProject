package com.example.Hostel_Management.model;

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

    // ✅ LINK HOSTEL WITH ADMIN
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
