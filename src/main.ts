import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Route, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor';
import { inject } from '@angular/core';

const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./app/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [() => !!localStorage.getItem('token') || redirectToLogin()],
  },
  { path: '**', redirectTo: '/login' },
];

function redirectToLogin(): boolean {
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])), // Register functional interceptor
  ],
});
