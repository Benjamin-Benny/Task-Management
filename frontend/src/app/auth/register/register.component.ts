import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatInputModule,FormsModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  model: any = {};
  user: User = new User;
  constructor(private authService: AuthService, private router: Router) { }

  register() {
    console.log("inside register");
    this.authService.register(this.user).subscribe(() => {
      this.router.navigate(['/login']); 
    });
  }
}