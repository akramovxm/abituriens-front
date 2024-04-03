import {Component, inject, Input, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "@service/auth/auth.service";
import {VerifyData} from "@interface/verify-data";
import {Router} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-verify-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './verify-form.component.html',
  styleUrl: './verify-form.component.css'
})
export class VerifyFormComponent implements OnInit {
  email = sessionStorage.getItem('email') ?? '';
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  verifyForm = this.formBuilder.group({
    email: [this.email, [Validators.required]],
    verifyCode: ['', [Validators.required]]
  });

  ngOnInit() {
    this.verifyForm.controls.email.setValue(this.email);
  }

  get isVerifyLoading() {
    return this.authService.isVerifyLoading.value;
  }
  get isResendLoading() {
    return this.authService.isResendLoading.value;
  }
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
    this.authService.resendCode(this.email);
  }
}
