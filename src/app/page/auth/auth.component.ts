import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "@service/auth/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatDivider} from "@angular/material/divider";
import {GoogleButtonComponent} from "@component/google-button/google-button.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {LoginFormComponent} from "@component/login-form/login-form.component";
import {MatButton} from "@angular/material/button";
import {RegisterFormComponent} from "@component/register-form/register-form.component";
import {FacebookButtonComponent} from "@component/facebook-button/facebook-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    MatProgressBar,
    MatDivider,
    GoogleButtonComponent,
    LoginFormComponent,
    MatButton,
    RegisterFormComponent,
    FacebookButtonComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authService = inject(AuthService);

  isXSmall = false;
  isLoginForm = true;

  get isLoading() {
    return this.authService.isLoginLoading.value || this.authService.isRegisterLoading.value
  }

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(res => {
        this.isXSmall = res.matches;
      })
  }

  switchForm() {
    this.isLoginForm = !this.isLoginForm;
  }
}
