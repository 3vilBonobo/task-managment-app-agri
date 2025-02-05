import { Route } from '@angular/router';

//Routes using lazy-loading functionality with import()
export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('../app/features/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../app/features/users/users.component').then(
        (m) => m.UsersComponent
      ),
  },
  { path: '**', redirectTo: '/login' }, //Create a 404 page in the future??
];
