import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {NgIf} from "@angular/common";
import {LogoutButtonComponent} from "@component/logout-button/logout-button.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    RouterLink,
    NgIf,
    LogoutButtonComponent,
    MatTooltip
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);

  get profilePath() {
    return this.authService.role.value?.toLowerCase();
  }
  get isAuth() {
    return this.authService.isAuth.value;
  }
}
