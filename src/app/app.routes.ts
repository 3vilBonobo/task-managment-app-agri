import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('../app/features/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('../app/features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        title: 'Users',
        loadComponent: () =>
          import('../app/features/users/users.component').then(
            (m) => m.UsersComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', redirectTo: '/login' }, // Redirect unknown routes to login
];
