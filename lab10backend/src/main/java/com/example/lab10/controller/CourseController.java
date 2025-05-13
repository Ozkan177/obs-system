package com.example.lab10.controller;

import com.example.lab10.entity.Course;
import com.example.lab10.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    // Course tablosu üzerinde işlem yapmak için CourseRepository kullanılır
    @Autowired
    private CourseRepository courseRepository;

    // Tüm dersleri getir
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Yeni ders oluştur
    // @PostMapping
    // public Course createCourse(@RequestBody Course course) {
    //     return courseRepository.save(course);
    // }


    // @DeleteMapping("/{id}")
    // public void deleteCourse(@PathVariable Long id) {
    //     courseRepository.deleteById(id);
    // }

    // @PutMapping("/{id}")
    // public Course updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
    //     return courseRepository.findById(id).map(course -> {
    //         course.setTitle(updatedCourse.getTitle());
    //         course.setCourseCode(updatedCourse.getCourseCode());
    //         course.setTeacher(updatedCourse.getTeacher());
    //         course.setStudents(updatedCourse.getStudents());
    //         return courseRepository.save(course);
    //     }).orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    // }

    @PostMapping
public ResponseEntity<Course> addCourse(@RequestBody Course course) {
    return ResponseEntity.ok(courseRepository.save(course));
}

@PutMapping("/{id}")
public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
    Course c = courseRepository.findById(id).orElseThrow();
    c.setTitle(course.getTitle());
    c.setCourseCode(course.getCourseCode());
    c.setTeacher(course.getTeacher());
    return ResponseEntity.ok(courseRepository.save(c));
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
    courseRepository.deleteById(id);
    return ResponseEntity.ok().build();
}

}
