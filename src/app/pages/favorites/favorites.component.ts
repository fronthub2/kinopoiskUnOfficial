import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilm } from '../../interface/films.interface';
import { FavoriteFilmService } from '../../services/favorite-film.service';
import { ListFilmsComponent } from "../../shared/list-films/list-films.component";

@Component({
  selector: 'app-favorites',
  imports: [ListFilmsComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private favoriteFilmService = inject(FavoriteFilmService);
  private _films = new BehaviorSubject<IFilm[]>([]);

  favoriteFilms = this.favoriteFilmService.getFavoriteFilm();

  films$ = this._films.asObservable();

  ngOnInit(): void {
    if (this.favoriteFilms) {
      this._films.next(this.favoriteFilms);
    }
  }
}
