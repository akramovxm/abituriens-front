import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {LoginData} from "@interface/login-data";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {fadeIn} from "@animation/fadeIn";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatGridList,
    MatGridTile
  ],
  animations: [fadeIn],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  isLoading = this.authService.isLoginLoading;
  isXSmall = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(res => {
        this.isXSmall = res.matches;
      })
  }

  get emailError() {
    const email = this.loginForm.controls.email;
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
    const password = this.loginForm.controls.password;
    const errors = password.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Password is required';
    }
    return error;
  }

  submitLoginForm() {
    if (this.loginForm.invalid) return;
    this.authService.login(<LoginData>this.loginForm.value);
  }
}
