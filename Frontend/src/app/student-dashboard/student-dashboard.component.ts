import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../services/course-service.service';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  standalone: false
})
export class StudentDashboardComponent implements OnInit {
  allCourses: Course[] = [];
  approvedCourses: any[] = [];
  pendingCourses: any[] = [];

  currentStudentId: number = 0;

  constructor(
    private courseService: CourseService,
    private http: HttpClient,
    private loginService: LoginServiceService,private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user && user.id) {
      this.currentStudentId = user.id;

      this.courseService.getAllCourses().subscribe(data => {
        this.allCourses = data;
      });

      this.http.get<any[]>(`http://localhost:8080/api/enrollments/approved/${this.currentStudentId}`)
        .subscribe(data => this.approvedCourses = data.map(req => req.course));

      this.http.get<any[]>(`http://localhost:8080/api/enrollments/pending/student/${this.currentStudentId}`)
        .subscribe(data => this.pendingCourses = data.map(req => req.course));
    }
  }

  requestCourse(courseId: number) {
  this.http.post(`http://localhost:8080/api/enrollments/request?studentId=${this.currentStudentId}&courseId=${courseId}`, {})
    .subscribe(() => {
      alert('İstek gönderildi!');
      this.ngOnInit(); // refresh list
    });
}

isRequested(course: Course): boolean {
  return this.pendingCourses.some(c => c.id === course.id)
    || this.approvedCourses.some(c => c.id === course.id);
}

logout() {
  this.loginService.logout();
  this.router.navigate(['/']);
}

}
