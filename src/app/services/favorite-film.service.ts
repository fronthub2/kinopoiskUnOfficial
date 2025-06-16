import { inject, Injectable } from '@angular/core';
import { IFilm } from '../interface/films.interface';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteFilmService {
  private lsService = inject(LocalStorageService);

  hasFavoriteFilm(filmId: number): boolean {
    const user = this.lsService.getUser();

    if (!user?.favoritesFilms) {
      return false;
    }

    return user.favoritesFilms.some((flm) => flm.kinopoiskId === filmId);
  }

  addFavoriteFilm(film: IFilm): void {
    const user = this.lsService.getUser();
    if (!user) return;

    const isFavoriteFilm = this.hasFavoriteFilm(film.kinopoiskId);

    if (!isFavoriteFilm) {
      user.favoritesFilms.push(film);
      this.lsService.setUser(user);
    } else {
      this.deleteFavoriteFilm(film.kinopoiskId);
    }
  }

  deleteFavoriteFilm(filmId: number): void {
    const user = this.lsService.getUser();
    if (!user) return;

    const arrFilms = user.favoritesFilms
    .filter((flm) => flm.kinopoiskId !== filmId);
    user.favoritesFilms = arrFilms;
    this.lsService.setUser(user);
  }
}
