import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let role = localStorage.getItem('role');
  let roleType = getRole(role);
  if (route.url[0].path == roleType) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

function getRole(id: string | null) {
  switch (id) {
    case '1':
      return 'admin';
    case '2':
      return 'recruiter';
    case '3':
      return 'job-seeker';
    default:
      return '';
  }
}
