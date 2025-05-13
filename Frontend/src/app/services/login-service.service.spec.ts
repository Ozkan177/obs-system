import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  loginStudent(payload: { id: number, password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login/student', payload);
  }

  loginTeacher(payload: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login/teacher', payload);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
