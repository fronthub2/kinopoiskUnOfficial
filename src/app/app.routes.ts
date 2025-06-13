import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { ListFilmsComponent } from './pages/list-films/list-films.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ListFilmsComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
];
