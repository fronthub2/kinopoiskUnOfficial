import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

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
];
