import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const registerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutentificated()) {
    // se è loggato, lo rimando alla home (o dove preferisci)
    router.navigate(['/']);
    return false;
  }

  return true; // può entrare solo se NON è loggato
};
