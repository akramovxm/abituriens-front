import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@service/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-oauth2-redirect',
  standalone: true,
  imports: [],
  templateUrl: './oauth2-redirect.component.html',
  styleUrl: './oauth2-redirect.component.css'
})
export class Oauth2RedirectComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackbar = inject(MatSnackBar);
  authService = inject(AuthService);

  ngOnInit() {
    this.route.queryParams.subscribe(value => {
      const token = value['token'];
      const error = value['error'];
      if (token) {
        this.authService.setToken(token);
        this.authService.isAuth.next(true);
        const decodedToken = this.authService.decodeToken(token);
        this.authService.role.next(decodedToken.role);
        this.router.navigate([decodedToken.role.toLowerCase()])
      } else if (error) {
        this.snackbar.open(error, 'Close', { duration: 5000 });
        this.router.navigate(['/'])
      } else {
        this.router.navigate(['/'])
      }
    });
  }
}
