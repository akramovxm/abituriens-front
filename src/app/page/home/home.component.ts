import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {NgIf} from "@angular/common";
import {LogoutButtonComponent} from "@component/logout-button/logout-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf,
    LogoutButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);

  get isAuth() {
    return this.authService.isAuth.value;
  }
}
