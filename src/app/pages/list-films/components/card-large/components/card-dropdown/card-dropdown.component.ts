import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiDropdown } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IDialogFilm, IFilm, IStaff, ProffessionKey } from '../../../../../../interface/films.interface';
import { GenresPipe } from '../../../../../../pipes/genres.pipe';
import { CardDropDownStaffComponent } from './card-dropdown-staff/card-dropdown-staff.component';

@Component({
  selector: 'app-card-dropdown',
  imports: [
    GenresPipe,
    TuiButton,
    AsyncPipe,
    TuiDropdown,
    CardDropDownStaffComponent
  ],
  templateUrl: './card-dropdown.component.html',
  styleUrl: './card-dropdown.component.scss'
})
export class CardDropdownComponent implements OnInit {
  private dialogContext = inject<TuiDialogContext<void, IDialogFilm>>(POLYMORPHEUS_CONTEXT);
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
      map((staff) => staff.slice(0,10)),
      catchError(() => of([]))
    );
  }
}
