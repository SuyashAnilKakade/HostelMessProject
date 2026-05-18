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
//public class MessMenuItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private MenuType menuType;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Category category;
//
//    @Column(nullable = false)
//    private String name;
//
//    public enum MenuType {
//        DAILY, WEEKLY
//    }
//
//    public enum Category {
//        DAL, RICE, BHAJI, ROTI, SWEET, OTHER
//    }
//}

package com.example.Hostel_Management.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mess_menu_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessMenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String bhaji1;
    private String bhaji2;
    private String rice;
    private String dal;
    private String roti;
    private String sweet;

    @Column(name = "image_path")
    private String image;

    @Transient
    private Long voteCount; // NOT stored in DB
}
