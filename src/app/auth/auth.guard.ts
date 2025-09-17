import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

   const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAutentificated()) {
    // se non sei loggato → ti mando al login
    router.navigate(['/login']);
    return false;
  }

  if (!authService.isRoleAdmin()) {
    // se sei loggato ma NON sei admin → ti mando alla home
    router.navigate(['/home']);
    return false;
  }

  return true; // sei admin → puoi entrare
};