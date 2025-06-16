import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiDialogService,
} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs';
import { IFilm, IResponce } from '../../interface/films.interface';
import { FilmsService } from '../../services/films.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { CardLargeComponent } from './components/card-large/card-large.component';
import { CardDropdownComponent } from './components/card-large/components/card-dropdown/card-dropdown.component';
import { CardMobileComponent } from './components/card-mobile/card-mobile.component';
import { CardSmallComponent } from './components/card-small/card-small.component';
import { FavoriteFilmService } from '../../services/favorite-film.service';

@Component({
  selector: 'app-list-films',
  imports: [
    TuiCardLarge,
    TuiAppearance,
    AsyncPipe,
    CardLargeComponent,
    CardSmallComponent,
    CardMobileComponent,
    PaginationComponent,
  ],
  templateUrl: './list-films.component.html',
  styleUrl: './list-films.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFilmsComponent implements OnInit, OnDestroy {
  private fimlsService = inject(FilmsService);
  private dialogService = inject(TuiDialogService);
  private favoriteFilmService = inject(FavoriteFilmService);

  private _destroy = new Subject<void>();
  private _films = new BehaviorSubject<IFilm[]>([]);

  breakpoint$ = inject(TuiBreakpointService);

  films$ = this._films.asObservable();

  page: number = 0;
  totalPages: number = 10;

  ngOnInit(): void {
    this.getCollectionsFilms();
  }

  getCollectionsFilms(page: number = 1): void {
    this.fimlsService
      .getCollectionsFilms(page)
      .pipe(
        //подумать
        tap((resp) => {
          this.totalPages = resp.totalPages;
        }),
        map((resp: IResponce) => resp.items),
        takeUntil(this._destroy)
      )
      .subscribe({
        next: (films: IFilm[]) => this._films.next(films),
        error: (err) => console.log(err),
      });
  }

  addFavorite(film: IFilm): void {
    this.favoriteFilmService.addFavoriteFilm(film);
  }

  hasFavoriteFilm(filmId: number): boolean | undefined {
    return this.favoriteFilmService.hasFavoriteFilm(filmId);
  }

  moreFilm(film: IFilm): void {
    const staff = this.fimlsService.getStaffFilm(film.kinopoiskId);

    this.dialogService
      .open(new PolymorpheusComponent(CardDropdownComponent), {
        data: {
          film,
          staff,
        },
        size: 'page',
      })
      .subscribe();
  }

  goToPage(page: number): void {
    this.getCollectionsFilms(page + 1);
    this.page = page;
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
