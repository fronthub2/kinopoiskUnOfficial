import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { Router } from '@angular/router';
import { IUser } from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private lsService = inject(LocalStorageService);
  private router = inject(Router);

  login(username: string): void {
    const user: IUser = {
      name: username,
      favoritesFilms: [],
    };
    this.lsService.setUser(user);
    this.router.navigate(['/']);
  }
}
