import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: String = "http://localhost:8080";

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const headers = this.getHeaders();
    return this.http.get<Task[]>(`${this.apiUrl}/api/tasks`, { headers });
  }

  getTask(id: number): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.get<Task>(`${this.apiUrl}/api/tasks/${id}`, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.post<Task>(`${this.apiUrl}/api/tasks`, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.put<Task>(`${this.apiUrl}/api/tasks/${task.id}`, task, { headers });
  }

  deleteTask(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/api/tasks/${id}`, { headers });
  }
}
