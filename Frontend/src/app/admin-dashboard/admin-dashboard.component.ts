import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: false
})
export class AdminDashboardComponent implements OnInit {
  students: any[] = [];
  teachers: any[] = [];
  editStudent: any = null;
  editTeacher: any = null;
  courses: any[] = [];
  newCourse = { title: '', courseCode: '', teacherId: null };
  studentCount = 0;
teacherCount = 0;
courseCount = 0;


  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
  this.http.get<any[]>('http://localhost:8080/api/students').subscribe(data => {
    this.students = data;
    this.studentCount = data.length;
  });
  this.http.get<any[]>('http://localhost:8080/api/teachers').subscribe(data => {
    this.teachers = data;
    this.teacherCount = data.length;
  });
  this.http.get<any[]>('http://localhost:8080/api/courses').subscribe(data => {
    this.courses = data;
    this.courseCount = data.length;
  });
}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  deleteStudent(id: number) {
  this.http.delete(`http://localhost:8080/api/students/${id}`).subscribe(() => {
    this.students = this.students.filter(s => s.id !== id);
  });
}

deleteTeacher(id: number) {
  this.http.delete(`http://localhost:8080/api/teachers/${id}`).subscribe(() => {
    this.teachers = this.teachers.filter(t => t.id !== t.id);
  });
}

saveStudent(student: any) {
  this.http.put(`http://localhost:8080/api/students/${student.id}`, student)
    .subscribe(() => this.editStudent = null);
}

saveTeacher(teacher: any) {
  this.http.put(`http://localhost:8080/api/teachers/${teacher.id}`, teacher)
    .subscribe(() => this.editTeacher = null);
}

addCourse() {
  const payload = {
    title: this.newCourse.title,
    courseCode: this.newCourse.courseCode,
    teacher: { id: this.newCourse.teacherId } // 🔧 burada teacher objesi içine alıyoruz
  };

  this.http.post('http://localhost:8080/api/courses', payload).subscribe(() => this.ngOnInit());
}

deleteCourse(id: number) {
  this.http.delete(`http://localhost:8080/api/courses/${id}`).subscribe(() => this.ngOnInit());
}

}
