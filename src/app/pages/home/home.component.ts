import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  TuiIcon,
} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { GenresPipe } from '../../pipes/genres.pipe';
import { SliceTextPipe } from '../../pipes/slice-text.pipe';
import { FilmsService, IFilm, IResponce } from '../../services/films.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-home',
  imports: [
    TuiCardLarge,
    TuiAppearance,
    AsyncPipe,
    TuiIcon,
    GenresPipe,
    SliceTextPipe,
    TuiButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private fimlsService = inject(FilmsService);
  private destroy$ = new Subject<void>();
  private lsService = inject(LocalStorageService);

  breakpoint$ = inject(TuiBreakpointService);
  items$ = new BehaviorSubject<IFilm[]>([]);

  ngOnInit() {
    this.fimlsService
      .getCollectionsFilms()
      .pipe(
        map((films: IResponce) => films.items),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (items: IFilm[]) => this.items$.next(items),
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

  hasFavoriteFilm(id: string): boolean | undefined {
    return this.lsService.hasFavoriteFilm(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
