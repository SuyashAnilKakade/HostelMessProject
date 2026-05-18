//package com.example.Hostel_Management.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class    MessVote {
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
//    @JoinColumn(name = "item_id")
//    private MessMenuItem item;
//
//    // ✅ REQUIRED for category-wise voting
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private MessMenuItem.MenuType menuType;
//}


package com.example.Hostel_Management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "mess_vote",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id"})
)
public class MessVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "thali_id")
    private MessMenuItem thali;
}
