import {Component, inject} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    MatDivider,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  location = inject(Location);
  isSmall = false;

  onBackClick() {
    this.location.back();
  }

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(res => {
        this.isSmall = res.matches;
      })
  }
}
