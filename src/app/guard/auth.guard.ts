import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@service/auth/auth.service";
import {Role} from "@enum/role";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth = authService.isAuth.value;
  const userRole = authService.role.value;
  const exceptedRole: Role = route.data['role'];

  const hasRole = exceptedRole === userRole;

  return (hasRole && isAuth) || router.navigate(['/']);
};
