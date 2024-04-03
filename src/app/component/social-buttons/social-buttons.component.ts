import { Component } from '@angular/core';
import {FacebookButtonComponent} from "@component/facebook-button/facebook-button.component";
import {GoogleButtonComponent} from "@component/google-button/google-button.component";

@Component({
  selector: 'app-social-buttons',
  standalone: true,
    imports: [
        FacebookButtonComponent,
        GoogleButtonComponent
    ],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.css'
})
export class SocialButtonsComponent {

}
