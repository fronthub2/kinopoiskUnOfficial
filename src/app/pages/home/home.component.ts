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
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CardLargeComponent } from './components/card-large/card-large.component';
import { CardMobileComponent } from './components/card-mobile/card-mobile.component';
import { CardSmallComponent } from './components/card-small/card-small.component';

@Component({
  selector: 'app-home',
  imports: [
    TuiCardLarge,
    TuiAppearance,
    AsyncPipe,
    CardLargeComponent,
    CardSmallComponent,
    CardMobileComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private fimlsService = inject(FilmsService);
  private lsService = inject(LocalStorageService);
  private dialogService = inject(TuiDialogService);

  private destroy$ = new Subject<void>();
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
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (films: IFilm[]) => this._films.next(films),
      });
  }

  addFavorite(film: IFilm): void {
    const user = this.lsService.getUser();
    if (!user) return;

    const isFavoriteFilm = this.hasFavoriteFilm(film.kinopoiskId);

    if (!isFavoriteFilm) {
      this.lsService.addFavoriteFilm(film);
    } else {
      this.lsService.deleteFavoriteFilm(film.kinopoiskId);
    }
  }

  hasFavoriteFilm(filmId: number): boolean | undefined {
    return this.lsService.hasFavoriteFilm(filmId);
  }

  moreFilm(film: IFilm): void {
    const staff = this.fimlsService.getStaffFilm(film.kinopoiskId);

    this.dialogService
      .open(new PolymorpheusComponent(DialogComponent), {
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
