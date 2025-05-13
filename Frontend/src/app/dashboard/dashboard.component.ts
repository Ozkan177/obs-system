import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Course, CourseService } from '../services/course-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentCourses: Course[] = [];
  allCourses: Course[] = [];

  constructor(
    private loginService: LoginServiceService,
    private courseService: CourseService,private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();

    if (user && user.courses) {
      this.studentCourses = user.courses;
    }

    this.courseService.getAllCourses().subscribe((data) => {
      this.allCourses = data;
    });
  }

  logout() {
  this.loginService.logout();
  this.router.navigate(['/']);
}
}
