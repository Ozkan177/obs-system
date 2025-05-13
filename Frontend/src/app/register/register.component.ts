import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone:false
})
export class RegisterComponent {
  role = '';
  user: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    let url = '';

    if (this.role === 'student') {
      url = 'http://localhost:8080/api/auth/register/student';
    } else if (this.role === 'teacher') {
      url = 'http://localhost:8080/api/auth/register/teacher';
    }

    this.http.post(url, this.user).subscribe({
      next: () => {
        alert('Kayıt başarılı!');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Kayıt başarısız.');
      }
    });
  }
}
