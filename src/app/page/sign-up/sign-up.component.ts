import {Component} from '@angular/core';
import {SignUpFormComponent} from "@component/sign-up-form/sign-up-form.component";
import {fadeIn} from "@animation/fadeIn";
import {AuthCardComponent} from "@component/auth-card/auth-card.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    SignUpFormComponent,
    AuthCardComponent
  ],
  animations: [fadeIn],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
}
