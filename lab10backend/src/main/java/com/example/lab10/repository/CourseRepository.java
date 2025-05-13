package com.example.lab10.repository;

import com.example.lab10.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // JpaRepository ders verilerine erişim sağlar
}
