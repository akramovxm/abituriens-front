import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VerifyDialogComponent} from "@component/verify-dialog/verify-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class VerifyDialogService {
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<VerifyDialogComponent> | undefined;

  openDialog(message: string, email: string) {
    this.dialogRef = this.dialog.open(VerifyDialogComponent, { data: { message, email } });
  }

  closeDialog() {
    this.dialogRef?.close();
  }
}
