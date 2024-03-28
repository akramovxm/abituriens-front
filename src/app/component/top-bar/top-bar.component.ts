import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {AuthService} from "@service/auth/auth.service";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "@component/confirm-dialog/confirm-dialog.component";

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

  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<ConfirmDialogComponent> | undefined;

  openLogoutDialog() {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title: 'Logout',
        message: 'Are you sure you want to log out?',
        onConfirm: () => {
          this.authService.logout();
          this.dialogRef?.close();
        }
      }});
  }
}
