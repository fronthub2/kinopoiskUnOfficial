import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { IFilm } from '../interface/films.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteFilmService {
  private lsService = inject(LocalStorageService);

  hasFavoriteFilm(filmId: number): boolean {
    const user = this.lsService.getUser();
    if (!user) {
      // this.router.navigate(['/login']);
      return false;
    }

    return user.favoritesFilms.some((flm) => flm.kinopoiskId === filmId);
  }

  addFavoriteFilm(film: IFilm): void {
    const user = this.lsService.getUser();
    if (!user) return;

    const isFavoriteFilm = this.hasFavoriteFilm(film.kinopoiskId);

    if (!isFavoriteFilm) {
      const user = this.lsService.getUser();
      if (!user) {
        // this.router.navigate(['/login']);
        return;
      }

      user.favoritesFilms.push(film);
      this.lsService.setUser(user);
    } else {
      this.deleteFavoriteFilm(film.kinopoiskId);
    }
  }

  deleteFavoriteFilm(filmId: number): void {
    const user = this.lsService.getUser();
    if (!user) {
      // this.router.navigate(['/login']);
      return;
    }

    const arrFilms = user.favoritesFilms.filter(
      (flm) => flm.kinopoiskId !== filmId
    );
    user.favoritesFilms = arrFilms;
    this.lsService.setUser(user);
  }
}
