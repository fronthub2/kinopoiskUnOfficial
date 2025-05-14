import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (state.url === '' || state.url === '/') {
    if (user) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  if (state.url === '/login') {
    if (user) {
      router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
