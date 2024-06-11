import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getTasks(): Observable<Task[]> {
    const headers = this.getHeaders();
    return this.http.get<Task[]>(`${this.apiUrl}/api/tasks`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.get<Task>(`${this.apiUrl}/api/tasks/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.post<Task>(`${this.apiUrl}/api/tasks`, task, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.put<Task>(`${this.apiUrl}/api/tasks/${task.id}`, task, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/api/tasks/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
