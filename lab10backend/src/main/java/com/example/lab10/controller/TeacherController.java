package com.example.lab10.controller;

import com.example.lab10.entity.Teacher;
import com.example.lab10.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    // Repository sayesinde Teacher tablosuna erişim sağlanır
    @Autowired
    private TeacherRepository teacherRepository;

    // Tüm öğretmenleri getir
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    // Yeni öğretmen kaydet
    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    // Öğretmen sil
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
    teacherRepository.deleteById(id);
    return ResponseEntity.ok().build();
}


    @PutMapping("/{id}")
public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher updatedTeacher) {
    return teacherRepository.findById(id).map(teacher -> {
        teacher.setName(updatedTeacher.getName());
        teacher.setSurname(updatedTeacher.getSurname());
        teacher.setDepartment(updatedTeacher.getDepartment());
        return teacherRepository.save(teacher);
    }).orElseThrow(() -> new RuntimeException("Teacher not found with id " + id));
}

}
