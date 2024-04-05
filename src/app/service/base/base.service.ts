import {inject, Injectable} from '@angular/core';
import {API_BASE_URL} from "../../app.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseURL = API_BASE_URL;
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);

  snackbarDuration = 5000;

  handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      this.snackbar.open('Server Error', 'Close', { duration: this.snackbarDuration });
    } else {
      this.snackbar.open(err.error.message, 'Close', { duration: this.snackbarDuration });
    }
    const message = 'Something bad happened; please try again later';
    this.snackbar.open(message, 'Close', { duration: this.snackbarDuration });
    return throwError(() => new Error(message));
  }
}
