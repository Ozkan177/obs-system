import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  selectedRole: string = '';
  id: number = 0;
  password: string = '';
  username: any;

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  login() {
    const payload = {
      id: this.id,
      password: this.password,
    };

    if (this.selectedRole === 'student') {
      this.loginService.loginStudent(payload).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/student-dashboard']);
        },
        error: () => alert('Öğrenci girişi başarısız.'),
      });
    } else if (this.selectedRole === 'teacher') {
      this.loginService.loginTeacher(payload).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/teacher-dashboard']);
        },
        error: () => alert('Öğretmen girişi başarısız.'),
      });
    } else if (this.selectedRole === 'admin') {
      const payload = {
        username: this.username,
        password: this.password,
      };

      this.loginService.loginAdmin(payload).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/admin-dashboard']);
        },
        error: () => alert('Admin girişi başarısız.'),
      });
    }
  }
}
