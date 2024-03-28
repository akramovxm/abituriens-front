import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@service/auth/auth.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth = authService.isAuth.value;
  if (isAuth) {
    const userRole = authService.role.value;
    router.navigate([userRole?.toLowerCase()]);
    return false;
  }
  return true;
};
