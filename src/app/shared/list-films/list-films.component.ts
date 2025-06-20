import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiDialogService,
} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import {
  Observable
} from 'rxjs';
import { CardLargeComponent } from '../../features/films/ui/cards/card-large/card-large.component';
import { CardDropdownComponent } from '../../features/films/ui/cards/card-large/components/card-dropdown/card-dropdown.component';
import { CardMobileComponent } from '../../features/films/ui/cards/card-mobile/card-mobile.component';
import { CardSmallComponent } from '../../features/films/ui/cards/card-small/card-small.component';
import { FavoriteFilmService } from '../../services/favorite-film.service';
import { FilmsService } from '../../services/films.service';
import { IFilm } from '../interface/films.interface';
import { PaginationComponent } from '../ui/pagination/pagination.component';

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
export class ListFilmsComponent {
  private fimlsService = inject(FilmsService);
  private dialogService = inject(TuiDialogService);
  private favoriteFilmService = inject(FavoriteFilmService);

  breakpoint$ = inject(TuiBreakpointService);

  @Input() films$!: Observable<IFilm[]>;
  @Input() page!: number;
  @Input() totalPages!: number;
  @Output() changePage = new EventEmitter<number>();

  addFavorite(film: IFilm): void {
    this.favoriteFilmService.addFavoriteFilm(film);
  }

  hasFavoriteFilm(filmId: number): boolean {
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
        dismissible: false,
      })
      .subscribe();
  }

  goToPage(page: number): void {
    this.changePage.emit(page);
  }
}
