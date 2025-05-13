package com.example.lab10.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lab10.entity.Student;
import com.example.lab10.entity.Teacher;
import com.example.lab10.repository.AdminRepository;
import com.example.lab10.repository.StudentRepository;
import com.example.lab10.repository.TeacherRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private StudentRepository studentRepository;
    @Autowired private TeacherRepository teacherRepository;

    @PostMapping("/register/student")
    public Student registerStudent(@RequestBody Student student) {
        return studentRepository.save(student); // TODO: Şifre hashlenebilir
    }

    @PostMapping("/register/teacher")
    public Teacher registerTeacher(@RequestBody Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @PostMapping("/login/student")
    public ResponseEntity<?> loginStudent(@RequestBody Map<String, String> creds) {
        Long id = Long.parseLong(creds.get("id"));
        String password = creds.get("password");
        return studentRepository.findByIdAndPassword(id, password)
                .map(student -> ResponseEntity.ok(Map.of("status", "success", "user", student)))
                .orElse(ResponseEntity.status(401).body(Map.of("status", "fail")));
    }

    @PostMapping("/login/teacher")
public ResponseEntity<?> loginTeacher(@RequestBody Map<String, String> creds) {
    Long id = Long.parseLong(creds.get("id"));
    String password = creds.get("password");
    return teacherRepository.findByIdAndPassword(id, password)
            .map(teacher -> ResponseEntity.ok(Map.of("status", "success", "user", teacher)))
            .orElse(ResponseEntity.status(401).body(Map.of("status", "fail")));
}

@Autowired private AdminRepository adminRepository;

@PostMapping("/login/admin")
public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> creds) {
    String username = creds.get("username");
    String password = creds.get("password");
    return adminRepository.findByUsernameAndPassword(username, password)
            .map(admin -> ResponseEntity.ok(Map.of("status", "success", "user", admin, "role", "admin")))
            .orElse(ResponseEntity.status(401).body(Map.of("status", "fail")));
}


}

