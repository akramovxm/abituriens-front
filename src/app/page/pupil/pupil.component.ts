import {Component, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {LogoutButtonComponent} from "@component/logout-button/logout-button.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

const routes = [
  {
    title: 'Dashboard',
    path: '/pupil',
    iconName: 'dashboard'
  },
  {
    title: 'Topics',
    path: '/pupil/topics',
    iconName: 'description'
  },
  {
    title: 'Tasks',
    path: '/pupil/tasks',
    iconName: 'task'
  },
]

@Component({
  selector: 'app-pupil',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbar,
    LogoutButtonComponent,
    MatIconButton,
    MatIcon,
    MatNavList,
    RouterLink,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    RouterLinkActive,
    NgForOf,
    RouterOutlet,
    MatDivider
  ],
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.css'
})
export class PupilComponent {
  routes = routes;
  router = inject(Router);
}
