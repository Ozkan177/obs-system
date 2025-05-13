package com.example.lab10.controller;

import com.example.lab10.entity.Course;
import com.example.lab10.entity.EnrollmentRequest;
import com.example.lab10.entity.Student;
import com.example.lab10.repository.CourseRepository;
import com.example.lab10.repository.EnrollmentRequestRepository;
import com.example.lab10.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRequestRepository enrollmentRequestRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // İstek gönder
    @PostMapping("/request")
    public EnrollmentRequest requestCourse(@RequestParam Long studentId, @RequestParam Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        EnrollmentRequest request = new EnrollmentRequest();
        request.setStudent(student);
        request.setCourse(course);
        return enrollmentRequestRepository.save(request);
    }

    // Hocanın bekleyenleri
    @GetMapping("/pending/{teacherId}")
    public List<EnrollmentRequest> getPendingRequests(@PathVariable Long teacherId) {
        return enrollmentRequestRepository.findPendingRequestsForTeacher(teacherId);
    }

    // Onay işlemi
    @PostMapping("/approve/{requestId}")
    public EnrollmentRequest approveRequest(@PathVariable Long requestId) {
        EnrollmentRequest request = enrollmentRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setApproved(true);
        return enrollmentRequestRepository.save(request);
    }

    // Öğrencinin onaylanmış dersleri
    @GetMapping("/approved/{studentId}")
    public List<EnrollmentRequest> getApprovedCourses(@PathVariable Long studentId) {
        return enrollmentRequestRepository.findByStudentIdAndApproved(studentId, true);
    }

    // Öğrencinin bekleyen dersleri
    @GetMapping("/pending/student/{studentId}")
    public List<EnrollmentRequest> getStudentPendingCourses(@PathVariable Long studentId) {
        return enrollmentRequestRepository.findByStudentIdAndApproved(studentId, false);
    }
}
