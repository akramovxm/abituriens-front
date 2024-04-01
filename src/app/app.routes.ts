import { Routes } from '@angular/router';
import {AdminComponent} from "@page/admin/admin.component";
import {TeacherComponent} from "@page/teacher/teacher.component";
import {PupilComponent} from "@page/pupil/pupil.component";
import {NotFoundComponent} from "@page/not-found/not-found.component";
import {LayoutComponent} from "@page/layout/layout.component";
import {AuthComponent} from "@page/auth/auth.component";
import {notAuthGuard} from "@guard/notAuth.guard";
import {authGuard} from "@guard/auth.guard";
import {Role} from "@enum/role";
import {Oauth2RedirectComponent} from "@page/oauth2-redirect/oauth2-redirect.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'oauth2/redirect',
    component: Oauth2RedirectComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: Role.ADMIN.toLowerCase(),
        component: AdminComponent,
        canActivate: [authGuard],
        data: { role: Role.ADMIN }
      },
      {
        path: Role.TEACHER.toLowerCase(),
        component: TeacherComponent,
        canActivate: [authGuard],
        data: { role: Role.TEACHER }
      },
      {
        path: Role.PUPIL.toLowerCase(),
        component: PupilComponent,
        canActivate: [authGuard],
        data: { role: Role.PUPIL }
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
