import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
    imports: [
      MatDialogModule,
      MatButtonModule
    ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  dialogData: { title: string, message: string, onConfirm: () => void } = inject(MAT_DIALOG_DATA);
}
