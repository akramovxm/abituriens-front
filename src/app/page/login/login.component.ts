import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {AuthService} from "@service/auth/auth.service";
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatProgressBar
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  isLoading = this.authService.isLoading;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  get emailError() {
    const errors = this.email.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Email is required';
    } else if (errors?.['email']) {
      error = 'Email is invalid';
    }
    return error;
  }
  get passwordError() {
    const errors = this.password.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Password is required';
    }
    return error;
  }

  submitLoginForm() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value);
  }
}
