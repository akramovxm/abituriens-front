import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "@component/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<ConfirmDialogComponent> | undefined;

  openDialog(title: string, message: string, onConfirm: () => void) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: {
        title,
        message,
        onConfirm: () => {
          onConfirm();
          this.dialogRef?.close();
        }
      }});
  }
}
