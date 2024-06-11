import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl: String = "http://localhost:8080";
  
  constructor(private http: HttpClient, private router: Router) {
    
    let cUser: string | null = localStorage.getItem('token');
    cUser = cUser == null? "": cUser;
    this.currentUserSubject = new BehaviorSubject<any>(cUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user);
  }

  login(credentials: any): Observable<any> {
      console.log("hi inside login");
    return this.http.post<any>(`${this.apiUrl}/api/login`, credentials)
      .pipe(map(response => {
        const token = response.token; 
        console.log(token);
        localStorage.setItem('token', token); // save the token separately
        this.currentUserSubject.next(token);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}