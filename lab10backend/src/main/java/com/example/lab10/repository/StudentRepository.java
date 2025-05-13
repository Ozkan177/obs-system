package com.example.lab10.repository;

import com.example.lab10.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmailAndPassword(String email, String password);
    Optional<Student> findByIdAndPassword(Long id, String password);

}
