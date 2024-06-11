import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  model: any = {};
  user: User = new User;
  constructor(private authService: AuthService, private router: Router) { }

  register() {
    console.log('Registering user:', this.user);
    this.authService.register(this.user).pipe(
      switchMap(() => {
        console.log('Registration successful, logging in...');
        return this.authService.login(this.user);
      }),
      catchError((error) => {
        console.error('Registration or login failed', error);
        return throwError(error);
      })
    ).subscribe({
      next: () => {
        console.log('Login successful, navigating to tasks...');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Navigation to tasks failed', error);
      }
    });
  }
}