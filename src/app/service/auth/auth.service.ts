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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:8080/';
  http = inject(HttpClient);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  isLoading = new BehaviorSubject(false);

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

  login(data: Partial<LoginData>) {
    this.isLoading.next(true);
    this.http.post<AuthResponse>(this.baseURL + 'auth/login', data)
      .subscribe({
        next: res => {
          this.isLoading.next(false);
          this.setToken(res.token);
          this.isAuth.next(true);
          const decodedToken = this.decodeToken(res.token);
          this.role.next(decodedToken.role);
          this.router.navigate([decodedToken.role.toLowerCase()])
        },
        error: err => {
          this.isLoading.next(false);
          let message = err.error.message
          if (err.status === 0) {
            message = 'Server Error'
          }
          this.snackbar.open(message, 'Close', { duration: 3000 });
        }
      });
  }

  logout() {
    this.removeToken();
    this.role.next(null);
    this.isAuth.next(false);
    this.router.navigate(['']);
  }
}
