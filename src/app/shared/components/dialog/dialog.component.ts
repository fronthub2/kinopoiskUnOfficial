import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { TuiButton, TuiDialogContext, TuiDropdown } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {
  IDialogFilm,
  IFilm,
  IStaff,
  ProffessionKey,
} from '../../../interface/films.interface';
import { CountryPipe } from '../../../pipes/country.pipe';
import { GenresPipe } from '../../../pipes/genres.pipe';
import { StaffComponent } from './components/staff/staff.component';

@Component({
  selector: 'app-dialog',
  imports: [
    GenresPipe,
    CountryPipe,
    TuiButton,
    AsyncPipe,
    TuiDropdown,
    StaffComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
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
