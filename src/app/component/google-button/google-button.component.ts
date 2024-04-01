import { Component } from '@angular/core';
import {GOOGLE_AUTH_URL} from "../../app.constants";

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.css'
})
export class GoogleButtonComponent {
  googleAuthUrl = GOOGLE_AUTH_URL;
}
