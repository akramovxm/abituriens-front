import {Component} from '@angular/core';
import {SignInFormComponent} from "@component/sign-in-form/sign-in-form.component";
import {fadeIn} from "@animation/fadeIn";
import {AuthCardComponent} from "@component/auth-card/auth-card.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignInFormComponent,
    AuthCardComponent
  ],
  animations: [fadeIn],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
}
