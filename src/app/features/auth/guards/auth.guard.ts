import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (state.url === '' || state.url === '/') {
    if (user) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  }

  if (state.url === '/login') {
    if (user) {
      return router.createUrlTree(['']);
    } else {
      return true;
    }
  }

  if (user) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
