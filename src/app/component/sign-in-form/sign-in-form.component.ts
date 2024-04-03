import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {LoginData} from "@interface/login-data";

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get isLoading() {
    return this.authService.isLoginLoading.value;
  }
  get emailError() {
    const email = this.signInForm.controls.email;
    const errors = email.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Email is required';
    } else if (errors?.['email']) {
      error = 'Email is invalid';
    }
    return error;
  }
  get passwordError() {
    const password = this.signInForm.controls.password;
    const errors = password.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Password is required';
    }
    return error;
  }

  submitSignInForm() {
    if (this.signInForm.invalid) return;
    this.authService.login(<LoginData>this.signInForm.value);
  }
}
