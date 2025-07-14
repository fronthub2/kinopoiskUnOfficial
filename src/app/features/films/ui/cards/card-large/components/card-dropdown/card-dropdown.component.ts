import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  TuiButton,
  TuiDialogContext,
  TuiDropdown
} from '@taiga-ui/core';
import {
  POLYMORPHEUS_CONTEXT
} from '@taiga-ui/polymorpheus';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  take,
  takeUntil,
  timer
} from 'rxjs';
import { FavoriteFilmService } from '../../../../../api/favorite-film.service';

import { TuiSkeleton } from '@taiga-ui/kit';
import {
  IDialogFilm,
  IFilm,
  IStaff,
  ProffessionKey,
} from '../../../../../../../shared/interface/films.interface';
import { SkeletonService } from '../../../../../../../shared/services/skeleton.service';
import { IconButtonComponent } from '../../../../../../../shared/ui/icon-button/icon-button.component';
import { GenresPipe } from '../../../../../pipes/genres.pipe';
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
    TuiSkeleton
  ],
  templateUrl: './card-dropdown.component.html',
  styleUrl: './card-dropdown.component.scss',
})
export class CardDropdownComponent implements OnInit, OnDestroy {
  private dialogContext = inject<TuiDialogContext<void, IDialogFilm>>(POLYMORPHEUS_CONTEXT);
  private favoriteFilmService = inject(FavoriteFilmService);
  private skeletonService = inject(SkeletonService);

  private _destroy = new Subject<void>();
  private _film = new BehaviorSubject<IFilm | null>(null);
  private staff$: Observable<IStaff[]> = this.dialogContext.data.staff;
  
  film$: Observable<IFilm | null> = this._film.asObservable();

  directors$ = this.getProffession('DIRECTOR');
  actors$ = this.getProffession('ACTOR');
  producers$ = this.getProffession('PRODUCER');

  isSkeletonCardDropDown$ = this.skeletonService.getSkeletonCardDropDown().pipe(takeUntil(this._destroy));

  ngOnInit(): void {
    this._film.next(this.dialogContext.data.film);
    this.skeletonService.setSkeletonCardDropDown(true);
  }

  private getProffession(key: ProffessionKey): Observable<IStaff[]> {
    return this.staff$.pipe(
      map((staff) => staff.filter((person) => person.professionKey === key)),
      map((staff) => staff.slice(0, 10)),
      catchError(() => of([]))
    );
  }

  addFavoriteFilm(film: IFilm): void {
    this.favoriteFilmService.addFavoriteFilm(film);
  }

  hasFavoriteFilm(film: IFilm): boolean {
    return this.favoriteFilmService.hasFavoriteFilm(film.kinopoiskId);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
