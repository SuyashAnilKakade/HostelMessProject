package com.example.Hostel_Management.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ RELATION WITH HOSTEL
    @ManyToOne
    @JoinColumn(name = "hostel_id", nullable = false)
    private Hostel hostel;

    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private int capacity;

    @ElementCollection
    @CollectionTable(name = "room_services", joinColumns = @JoinColumn(name = "room_id"))
    @Column(name = "service")
    private List<String> services;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    public enum RoomType {
        Single, Double
    }

    public enum RoomStatus {
        Available, Occupied
    }
}
