package com.example.lab10.repository;

import com.example.lab10.entity.EnrollmentRequest;
import com.example.lab10.entity.Student;
import com.example.lab10.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollmentRequestRepository extends JpaRepository<EnrollmentRequest, Long> {

    List<EnrollmentRequest> findByStudentIdAndApproved(Long studentId, boolean approved);

    @Query("SELECT er FROM EnrollmentRequest er WHERE er.course.teacher.id = :teacherId AND er.approved = false")
    List<EnrollmentRequest> findPendingRequestsForTeacher(Long teacherId);

    List<EnrollmentRequest> findByStudentId(Long studentId);
}
