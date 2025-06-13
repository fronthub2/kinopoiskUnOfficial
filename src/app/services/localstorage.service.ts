import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IFilm } from '../interface/films.interface';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private router = inject(Router);

  constructor() {}

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (!user) return null;

    return JSON.parse(user);
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser(): void {
    localStorage.removeItem('user');
  }

  hasFavoriteFilm(filmId: number): boolean | undefined {
    const user = this.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    };

    return user.favoritesFilms.some((flm) => flm.kinopoiskId === filmId);
  }

  deleteFavoriteFilm(filmId: number): void {
    const user = this.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    };

    const arrFilms = user.favoritesFilms.filter((flm) => flm.kinopoiskId !== filmId);
    user.favoritesFilms = arrFilms;
    this.setUser(user);
  }

  addFavoriteFilm(film:IFilm): void {
    const user = this.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    };

    user.favoritesFilms.push(film);
    this.setUser(user);
  }
}
