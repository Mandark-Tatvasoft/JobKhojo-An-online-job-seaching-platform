import { Routes } from '@angular/router';
import { adminAuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((a) => a.AdminModule),
    canActivate: [adminAuthGuard],
  },
  {
    path: 'job-seeker',
    loadChildren: () =>
      import('./job-seeker/job-seeker.module').then((a) => a.JobSeekerModule),
    canActivate: [adminAuthGuard],
  },
  {
    path: 'recruiter',
    loadChildren: () =>
      import('./recruiter/recruiter.module').then((a) => a.RecruiterModule),
    canActivate: [adminAuthGuard],
  },
];
