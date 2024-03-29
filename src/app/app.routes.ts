import { Routes } from '@angular/router';
import {AdminComponent} from "@page/admin/admin.component";
import {TeacherComponent} from "@page/teacher/teacher.component";
import {PupilComponent} from "@page/pupil/pupil.component";
import {NotFoundComponent} from "@page/not-found/not-found.component";
import {LayoutComponent} from "@page/layout/layout.component";
import {LoginComponent} from "@page/login/login.component";
import {RegisterComponent} from "@page/register/register.component";
import {notAuthGuard} from "@guard/notAuth.guard";
import {authGuard} from "@guard/auth.guard";
import {Role} from "@enum/role";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard]
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
