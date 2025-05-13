package com.example.lab10.controller;

import com.example.lab10.entity.Student;
import com.example.lab10.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    // Repository, veritabanı işlemleri için kullanılır
    @Autowired
    private StudentRepository studentRepository;

    // Tüm öğrencileri getir
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Yeni öğrenci oluştur
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }


    @GetMapping("/login")
    public ResponseEntity<Map<String, Object>> loginStudent(@RequestParam Long id) {
        Map<String, Object> response = new HashMap<>();

        return studentRepository.findById(id)
                .map(student -> {
                    response.put("status", "success");
                    response.put("user", student); // 👈 frontend'e user döner
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("status", "error");
                    response.put("message", "Student not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }


    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setSurname(updatedStudent.getSurname());
            student.setEmail(updatedStudent.getEmail());
            student.setEnrollmentDate(updatedStudent.getEnrollmentDate());
            student.setCourses(updatedStudent.getCourses());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));  
    }      

    // Öğrenci sil
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
    studentRepository.deleteById(id);
    return ResponseEntity.ok().build();
}


}
