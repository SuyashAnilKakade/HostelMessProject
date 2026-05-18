package com.example.Hostel_Management;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class HostelManagementApplication {

	public static void main(String[] args) {
		log.info("HostelManagementApplication....");

		SpringApplication.run(HostelManagementApplication.class, args);
	}

}
