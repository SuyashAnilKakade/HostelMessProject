//package com.example.Hostel_Management.repository;
//
//import com.example.Hostel_Management.model.MessMenuItem;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface MessMenuItemRepository
//        extends JpaRepository<MessMenuItem, Long> {
//
//    List<MessMenuItem> findByMenuType(MessMenuItem.MenuType type);
//
//    void deleteByMenuType(MessMenuItem.MenuType type);
//}
package com.example.Hostel_Management.repository;

import com.example.Hostel_Management.model.MessMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessMenuItemRepository
        extends JpaRepository<MessMenuItem, Long> {
    // No extra methods needed
}
