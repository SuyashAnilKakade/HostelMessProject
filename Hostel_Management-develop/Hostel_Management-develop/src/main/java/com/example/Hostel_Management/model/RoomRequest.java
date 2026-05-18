//package com.example.Hostel_Management.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "room_requests",
//        uniqueConstraints = @UniqueConstraint(
//                columnNames = {"student_id", "room_id"}
//        ))
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class RoomRequest {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "student_id")
//    private User student;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "hostel_id")
//    private Hostel hostel;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "room_id")
//    private Room room;
//
//    @Enumerated(EnumType.STRING)
//    private Status status;
//
//    public enum Status {
//        PENDING,
//        APPROVED,
//        REJECTED
//    }
//}

package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "room_requests",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"student_id", "room_id"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ STUDENT NAME + EMAIL WILL COME
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "student_id")
    @JsonIgnoreProperties({"password", "role", "hostel", "room"})
    private User student;

    // ✅ HOSTEL NAME WILL COME
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "hostel_id")
    @JsonIgnoreProperties({"rooms"})
    private Hostel hostel;

    // ✅ ROOM NUMBER WILL COME
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "room_id")
    @JsonIgnoreProperties({"hostel"})
    private Room room;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}
