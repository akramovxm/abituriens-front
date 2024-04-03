import {Component} from '@angular/core';
import {AuthCardComponent} from "@component/auth-card/auth-card.component";
import {VerifyFormComponent} from "@component/verify-form/verify-form.component";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    AuthCardComponent,
    VerifyFormComponent
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {

}
