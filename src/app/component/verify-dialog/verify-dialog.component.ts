import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "@service/auth/auth.service";
import {NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {VerifyData} from "@interface/verify-data";

@Component({
  selector: 'app-verify-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    NgIf,
    MatProgressBar,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './verify-dialog.component.html',
  styleUrl: './verify-dialog.component.css'
})
export class VerifyDialogComponent {
  dialogData: { message: string, email: string } = inject(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  isVerifyLoading = this.authService.isVerifyLoading;
  isResendLoading = this.authService.isResendLoading;

  verifyForm = this.formBuilder.group({
    email: [this.dialogData.email, [Validators.required]],
    verifyCode: ['', [Validators.required]]
  });

  get codeError() {
    const verifyCode = this.verifyForm.controls.verifyCode;
    const errors = verifyCode.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Code is required';
    }
    return error;
  }

  submitVerifyForm() {
    if (this.verifyForm.invalid) return;
    this.authService.verify(<VerifyData>this.verifyForm.value);
  }

  submitResendCode() {
    this.authService.resendCode(this.dialogData.email);
  }
}
