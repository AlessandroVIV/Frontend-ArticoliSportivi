import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAutentificated() || !authService.isRoleAdmin()) {
    router.navigate(['/login']); 
    return false;
  }

  return true; 
  
};
