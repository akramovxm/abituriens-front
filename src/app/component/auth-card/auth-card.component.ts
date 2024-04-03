import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {SignInFormComponent} from "@component/sign-in-form/sign-in-form.component";
import {SocialButtonsComponent} from "@component/social-buttons/social-buttons.component";
import {AuthService} from "@service/auth/auth.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatProgressBar,
    NgIf,
    SignInFormComponent,
    SocialButtonsComponent
  ],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css'
})
export class AuthCardComponent {
  authService = inject(AuthService);

  isSmall = false;

  get isLoading() {
    return this.authService.isLoginLoading.value ||
      this.authService.isRegisterLoading.value ||
      this.authService.isVerifyLoading.value ||
      this.authService.isResendLoading.value;
  }

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(res => {
        this.isSmall = res.matches;
      })
  }
}
