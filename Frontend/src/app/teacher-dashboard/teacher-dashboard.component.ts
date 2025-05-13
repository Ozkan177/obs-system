import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
  standalone: false
})
export class TeacherDashboardComponent implements OnInit {
  pendingRequests: any[] = [];
  approvedRequests: any[] = [];

  teacherId: number = 0;

  constructor(
    private http: HttpClient,
    private loginService: LoginServiceService,private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getCurrentUser();
    if (user && user.id) {
      this.teacherId = user.id;

      // Onay bekleyenler
      this.http.get<any[]>(`http://localhost:8080/api/enrollments/pending/${this.teacherId}`)
        .subscribe(data => this.pendingRequests = data);

      // Onaylanmış öğrenciler
      this.http.get<any[]>(`http://localhost:8080/api/courses`) // tüm dersleri al
        .subscribe(data => {
          this.approvedRequests = [];
          for (let course of data) {
            if (course.teacher?.id === this.teacherId) {
              this.http.get<any[]>(`http://localhost:8080/api/enrollments/approved/${course.id}`)
                .subscribe(res => {
                  this.approvedRequests.push(...res.map(r => ({ student: r.student, course: course })));
                });
            }
          }
        });
    }
  }

  approveRequest(requestId: number) {
  this.http.post(`http://localhost:8080/api/enrollments/approve/${requestId}`, {})
    .subscribe(() => {
      alert('Onaylandı!');
      this.ngOnInit();
    });
}

logout() {
  this.loginService.logout();
  this.router.navigate(['/']);
}


}
