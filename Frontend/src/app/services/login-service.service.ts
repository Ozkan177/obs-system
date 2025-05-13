import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  login(payload: { id?: number; email?: string }): Observable<any> {
    let url = '';

    if (payload.id) {
      url = `http://localhost:8080/api/students/login?id=${payload.id}`;
    } else if (payload.email) {
      url = `http://localhost:8080/api/teachers/login?email=${payload.email}`;
    } else {
      throw new Error('Either id or email must be provided.');
    }

    return this.http.get(url).pipe(
      tap((response: any) => {
        localStorage.setItem('token', 'true');
        localStorage.setItem('user', JSON.stringify(response.user)); // 👈 kullanıcıyı kaydet
        console.log('Login successful');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

   loginStudent(payload: { id: number, password: string }): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/login/student', payload);
}

loginTeacher(payload: { id: number, password: string }): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/login/teacher', payload);
}

loginAdmin(payload: { username: string, password: string }): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/login/admin', payload);
}


}
