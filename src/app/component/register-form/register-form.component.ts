import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {RegisterData} from "@interface/register-data";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {fadeIn} from "@animation/fadeIn";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    NgIf,
    NgxMaskDirective,
    ReactiveFormsModule,
    RouterLink,
    MatGridList,
    MatGridTile
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en' },
    provideNativeDateAdapter()
  ],
  animations: [fadeIn],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  isLoading = this.authService.isRegisterLoading;
  isXSmall = false;

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phoneNumber: ['', []],
    birthDate: ['', []]
  });

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(res => {
        this.isXSmall = res.matches;
      })
  }

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
    if (this.registerForm.invalid) return;
    this.authService.register(<RegisterData>this.registerForm.value);
  }
}
