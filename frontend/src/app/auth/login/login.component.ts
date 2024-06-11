import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  model: any = {};
  user: User = new User;
  returnUrl: string | undefined;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authService.login(this.user).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
