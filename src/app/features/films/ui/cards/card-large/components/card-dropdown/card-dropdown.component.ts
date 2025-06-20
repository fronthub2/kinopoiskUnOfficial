import { AsyncPipe } from '@angular/common';
import { Component, inject, Injector, OnInit } from '@angular/core';
import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiDropdown,
} from '@taiga-ui/core';
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusComponent,
} from '@taiga-ui/polymorpheus';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { FavoriteFilmService } from '../../../../../../../services/favorite-film.service';

import { IDialogFilm, IFilm, IStaff, ProffessionKey } from '../../../../../../../shared/interface/films.interface';
import { GenresPipe } from '../../../../../../../shared/pipes/genres.pipe';
import { IconButtonComponent } from '../../../../../../../shared/ui/icon-button/icon-button.component';
import { VideoFilmComponent } from '../../../../video-film/video-film.component';
import { CardDropDownStaffComponent } from './card-dropdown-staff/card-dropdown-staff.component';

@Component({
  selector: 'app-card-dropdown',
  imports: [
    GenresPipe,
    TuiButton,
    AsyncPipe,
    TuiDropdown,
    CardDropDownStaffComponent,
    IconButtonComponent,
  ],
  templateUrl: './card-dropdown.component.html',
  styleUrl: './card-dropdown.component.scss',
})
export class CardDropdownComponent implements OnInit {
  private dialogContext =
    inject<TuiDialogContext<void, IDialogFilm>>(POLYMORPHEUS_CONTEXT);

  private dialogService = inject(TuiDialogService);
  private injector = inject(Injector);

  private favoriteFilmService = inject(FavoriteFilmService);
  private _film = new BehaviorSubject<IFilm | null>(null);
  private staff$: Observable<IStaff[]> = this.dialogContext.data.staff;

  film$: Observable<IFilm | null> = this._film.asObservable();

  directors$ = this.getProffession('DIRECTOR');
  actors$ = this.getProffession('ACTOR');
  producers$ = this.getProffession('PRODUCER');

  ngOnInit() {
    this._film.next(this.dialogContext.data.film);
  }

  private getProffession(key: ProffessionKey): Observable<IStaff[]> {
    return this.staff$.pipe(
      map((staff) => staff.filter((person) => person.professionKey === key)),
      map((staff) => staff.slice(0, 10)),
      catchError(() => of([]))
    );
  }

  addFavoriteFilm(film: IFilm) {
    this.favoriteFilmService.addFavoriteFilm(film);
  }

  hasFavoriteFilm(film: IFilm) {
    return this.favoriteFilmService.hasFavoriteFilm(film.kinopoiskId);
  }

  openTrailer() {
    this.dialogService
      .open(new PolymorpheusComponent(VideoFilmComponent, this.injector), {
        size: 'fullscreen'
      })
      .subscribe();
  }
}
