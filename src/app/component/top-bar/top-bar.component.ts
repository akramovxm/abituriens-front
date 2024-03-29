import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {AuthService} from "@service/auth/auth.service";
import {MatTooltip} from "@angular/material/tooltip";
import {ConfirmDialogService} from "@service/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    MatToolbar,
    MatTooltip
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
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
