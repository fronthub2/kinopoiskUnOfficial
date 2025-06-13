import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilm } from '../../../../interface/films.interface';

@Component({
  selector: 'app-card-large',
  imports: [],
  templateUrl: './card-large.component.html',
  styleUrl: './card-large.component.scss',
})
export class CardLargeComponent {
  @Input() film!: IFilm;
  @Output() moreFilm = new EventEmitter<IFilm>();

  emitMoreFilm(film: IFilm) {
    this.moreFilm.emit(film);
  }
}
