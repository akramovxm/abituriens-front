import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@service/auth/auth.service";
import {RouterLink} from "@angular/router";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {NgxMaskDirective} from "ngx-mask";
import {RegisterData} from "@interface/register-data";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    MatProgressBar,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    NgxMaskDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en' },
    provideNativeDateAdapter()
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  isLoading = this.authService.isRegisterLoading;

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
  });

  get firstNameError() {
    const firstName = this.registerForm.controls.firstName;
    const errors = firstName.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'First Name is required';
    }
    return error;
  }
  get lastNameError() {
    const lastName = this.registerForm.controls.lastName;
    const errors = lastName.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Last Name is required';
    }
    return error;
  }
  get phoneNumberError() {
    const phoneNumber = this.registerForm.controls.phoneNumber;
    const errors = phoneNumber.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Phone Number is required';
    } else if (errors?.['mask']) {
      error = 'Phone Number is invalid';
    }
    return error;
  }
  get birthDateError() {
    const birthDate = this.registerForm.controls.birthDate;
    const errors = birthDate.errors;
    let error = '';
    if (errors?.['matDatepickerParse']) {
      error = 'Birth Date is invalid';
    } else if (errors?.['required']) {
      error = 'Birth Date is required';
    }
    return error;
  }
  get emailError() {
    const email = this.registerForm.controls.email;
    const errors = email.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Email is required';
    } else if (errors?.['email']) {
      error = 'Email is invalid';
    }
    return error;
  }
  get passwordError() {
    const password = this.registerForm.controls.password;
    const errors = password.errors;
    let error = '';
    if (errors?.['required']) {
      error = 'Password is required';
    }
    return error;
  }

  submitRegisterForm() {
    console.log(this.registerForm)
    if (this.registerForm.invalid) return;
    this.authService.register(<RegisterData>this.registerForm.value);
  }
}
