package com.example.lab10.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.lab10.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsernameAndPassword(String username, String password);
}
