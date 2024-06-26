import { Routes } from '@angular/router';
import {AdminComponent} from "@page/admin/admin.component";
import {TeacherComponent} from "@page/teacher/teacher.component";
import {PupilComponent} from "@page/pupil/pupil.component";
import {NotFoundComponent} from "@page/not-found/not-found.component";
import {HomeComponent} from "@page/home/home.component";
import {SignInComponent} from "@page/sign-in/sign-in.component";
import {SignUpComponent} from "@page/sign-up/sign-up.component";
import {VerifyComponent} from "@page/verify/verify.component";
import {TopicsComponent} from "@page/pupil/topics/topics.component";
import {DashboardComponent} from "@page/pupil/dashboard/dashboard.component";
import {TopicComponent} from "@page/pupil/topics/topic/topic.component";
import {OverviewComponent} from "@page/pupil/topics/overview/overview.component";
import {Oauth2RedirectComponent} from "@page/oauth2-redirect/oauth2-redirect.component";
import {Role} from "@enum/role";
import {notAuthGuard} from "@guard/notAuth.guard";
import {authGuard} from "@guard/auth.guard";
import {verifyGuard} from "@guard/verify.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'verify-email',
    component: VerifyComponent,
    canActivate: [verifyGuard]
  },
  {
    path: 'oauth2/redirect',
    component: Oauth2RedirectComponent
  },
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
    data: { role: Role.PUPIL },
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'topics',
        component: TopicsComponent,
        children: [
          {
            path: '',
            component: OverviewComponent
          },
          {
            path: ':path',
            component: TopicComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
