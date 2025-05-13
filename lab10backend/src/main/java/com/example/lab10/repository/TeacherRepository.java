package com.example.lab10.repository;

import com.example.lab10.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmailAndPassword(String email, String password);
    Optional<Teacher> findByIdAndPassword(Long id, String password);

}

