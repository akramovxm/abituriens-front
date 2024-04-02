import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {AuthService} from "@service/auth/auth.service";
import {ConfirmDialogService} from "@service/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-logout-button',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip
    ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
  authService = inject(AuthService);
  confirmDialogService = inject(ConfirmDialogService);

  openLogoutDialog() {
    this.confirmDialogService.openDialog(
      'Logout',
      'Are you sure you want to log out?',
      () => this.authService.logout()
    )
  }
}
