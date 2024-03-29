import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {AuthResponse} from "@interface/auth-response";
import {LoginData} from "@interface/login-data";
import {DecodedToken} from "@interface/decoded-token";
import {Role} from "@enum/role";
import {RegisterData} from "@interface/register-data";
import {VerifyDialogService} from "@service/verify-dialog/verify-dialog.service";
import {VerifyData} from "@interface/verify-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:8080/';
  http = inject(HttpClient);
  router = inject(Router);
  snackbar = inject(MatSnackBar);
  verifyDialogService = inject(VerifyDialogService);

  isLoginLoading = new BehaviorSubject(false);
  isRegisterLoading = new BehaviorSubject(false);
  isVerifyLoading = new BehaviorSubject(false);
  isResendLoading = new BehaviorSubject(false);
  snackbarDuration = 5000;

  role = new BehaviorSubject<Role | null>(this.getRoleFromToken());
  isAuth = new BehaviorSubject(!this.isTokenExpired());

  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  decodeToken(token: string): DecodedToken {
    return jwtDecode(token);
  }
  isTokenExpired() {
    const token = this.getToken();
    if (token === null) return true;
    const decodedToken = this.decodeToken(token);
    if (!decodedToken.exp) return true;
    const expirationDate = decodedToken.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }
  getRoleFromToken() {
    const token = this.getToken();
    if (token === null) return null;
    const decodedToken = this.decodeToken(token);
    return decodedToken.role;
  }

  login(data: LoginData) {
    this.isLoginLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + 'auth/login', data)
      .subscribe({
        next: res => {
          this.isLoginLoading.next(false);
          this.setToken(res.token);
          this.isAuth.next(true);
          const decodedToken = this.decodeToken(res.token);
          this.role.next(decodedToken.role);
          this.router.navigate([decodedToken.role.toLowerCase()])
        },
        error: err => {
          this.isLoginLoading.next(false);
          let message = err.error.message
          if (err.status === 0) {
            message = 'Server Error'
          }
          this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
        }
      });
  }

  logout() {
    this.removeToken();
    this.role.next(null);
    this.isAuth.next(false);
    this.router.navigate(['']);
  }

  register(data: RegisterData) {
    this.isRegisterLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + 'auth/register', data)
      .subscribe({
        next: res => {
          this.isRegisterLoading.next(false);
          this.verifyDialogService.openDialog(res.message, data.email);
        },
        error: err => {
          this.isRegisterLoading.next(false);
          let message = err.error.message
          if (err.status === 0) {
            message = 'Server Error'
          }
          this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
        }
      })
  }

  verify(data: VerifyData) {
    this.isVerifyLoading.next(true);
    if (this.verifyDialogService.dialogRef) {
      this.verifyDialogService.dialogRef.disableClose = true;
    }
    this.http.post<AuthResponse>(this.baseURL + 'auth/verify', data)
      .subscribe({
        next: res => {
          this.isVerifyLoading.next(false);
          if (this.verifyDialogService.dialogRef) {
            this.verifyDialogService.dialogRef.disableClose = false;
          }
          this.verifyDialogService.closeDialog();
          this.router.navigate(['/'])
          this.snackbar.open(res.message, 'Close', { duration: this.snackbarDuration });
        },
        error: err => {
          this.isVerifyLoading.next(false);
          if (this.verifyDialogService.dialogRef) {
            this.verifyDialogService.dialogRef.disableClose = false;
          }
          let message = err.error.message
          if (err.status === 0) {
            message = 'Server Error'
          }
          this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
        }
      })
  }

  resendCode(email: string) {
    this.isResendLoading.next(true);
    if (this.verifyDialogService.dialogRef) {
      this.verifyDialogService.dialogRef.disableClose = true;
    }
    this.http.post<AuthResponse>(this.baseURL + 'auth/resend-code', { email })
      .subscribe({
        next: res => {
          this.isResendLoading.next(false);
          if (this.verifyDialogService.dialogRef) {
            this.verifyDialogService.dialogRef.disableClose = false;
          }
          this.snackbar.open(res.message, 'Close', { duration: this.snackbarDuration });
        },
        error: err => {
          this.isResendLoading.next(false);
          if (this.verifyDialogService.dialogRef) {
            this.verifyDialogService.dialogRef.disableClose = false;
          }
          let message = err.error.message
          if (err.status === 0) {
            message = 'Server Error'
          }
          this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
        }
      })
  }
}
