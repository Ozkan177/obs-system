import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  courseCode: string;
  teacher?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }
}