package com.example.lab10.entity;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean isLoggedIn = false;

    @Column(name = "course_code")
    private String courseCode;

    // Her dersin bir öğretmeni olur
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // Her ders birden fazla öğrenci tarafından alınabilir
    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private List<Student> students;

    public Long getId() {
        return id;
    }
    

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }


    public boolean isLoggedIn() {
        return isLoggedIn;
    }


    public void setLoggedIn(boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

}
