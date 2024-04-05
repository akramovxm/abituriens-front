import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {AuthResponse} from "@interface/auth-response";
import {LoginData} from "@interface/login-data";
import {DecodedToken} from "@interface/decoded-token";
import {Role} from "@enum/role";
import {RegisterData} from "@interface/register-data";
import {VerifyData} from "@interface/verify-data";
import {BaseService} from "@service/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  router = inject(Router);

  isLoginLoading = new BehaviorSubject(false);
  isRegisterLoading = new BehaviorSubject(false);
  isVerifyLoading = new BehaviorSubject(false);
  isResendLoading = new BehaviorSubject(false);

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

  openErrorSnackbar(err: any) {
    let message = err.error.message
    if (err.status === 0) {
      message = 'Server Error'
    }
    this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
  }

  login(data: LoginData) {
    this.isLoginLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + '/auth/login', data)
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
          this.openErrorSnackbar(err);
        }
      });
  }

  logout() {
    this.removeToken();
    this.role.next(null);
    this.isAuth.next(false);
    this.router.navigate(['/']);
  }

  register(data: RegisterData) {
    this.isRegisterLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + '/auth/register', data)
      .subscribe({
        next: res => {
          this.isRegisterLoading.next(false);
          sessionStorage.setItem('email', data.email);
          this.router.navigate(['/verify-email'])
        },
        error: err => {
          console.log(err)
          this.isRegisterLoading.next(false);
          this.openErrorSnackbar(err);
        }
      })
  }

  verify(data: VerifyData) {
    this.isVerifyLoading.next(true);

    this.http.post<AuthResponse>(this.baseURL + '/auth/verify', data)
      .subscribe({
        next: res => {
          this.isVerifyLoading.next(false);
          this.router.navigate(['/sign-in'])
          this.snackbar.open(res.message, 'Close', { duration: this.snackbarDuration });
        },
        error: err => {
          this.isVerifyLoading.next(false);
          this.openErrorSnackbar(err);
        }
      })
  }

  resendCode(email: string) {
    this.isResendLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + '/auth/resend-code', { email })
      .subscribe({
        next: res => {
          this.isResendLoading.next(false);
          this.snackbar.open(res.message, 'Close', { duration: this.snackbarDuration });
        },
        error: err => {
          this.isResendLoading.next(false);
          this.openErrorSnackbar(err);
        }
      })
  }
}
