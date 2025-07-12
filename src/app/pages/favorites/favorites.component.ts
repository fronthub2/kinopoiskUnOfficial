import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteFilmService } from '../../features/films/api/favorite-film.service';
import { IFilm } from '../../shared/interface/films.interface';
import { ListFilmsComponent } from "../../shared/list-films/list-films.component";
import { TuiSkeleton } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { SkeletonService } from '../../shared/services/skeleton.service';

@Component({
  selector: 'app-favorites',
  imports: [ListFilmsComponent, TuiSkeleton, AsyncPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private skeletonService = inject(SkeletonService);
  private favoriteFilmService = inject(FavoriteFilmService);
  private _films = new BehaviorSubject<IFilm[]>([]);

  favoriteFilms = this.favoriteFilmService.getFavoriteFilm();
  isSkeleton$ = this.skeletonService.getSkeleton();

  films$ = this._films.asObservable();

  ngOnInit(): void {
    if (this.favoriteFilms) {
      this._films.next(this.favoriteFilms);
    }
  }
}
