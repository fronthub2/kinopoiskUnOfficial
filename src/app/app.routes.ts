import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/ui/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'collections',
        loadComponent: () => import('./pages/collections/collections.component').then((c) => c.CollectionsComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then((c) => c.FavoritesComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found-pages/not-found-pages.component').then((c) => c.NotFoundPagesComponent)
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];
