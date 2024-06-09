import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FlexLayoutModule,FormsModule,ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatLabel],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}