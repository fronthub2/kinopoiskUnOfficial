import { Component, Input } from '@angular/core';
import { IFilm } from '../../../../../shared/interface/films.interface';

@Component({
  selector: 'app-card-mobile',
  imports: [],
  templateUrl: './card-mobile.component.html',
  styleUrl: './card-mobile.component.scss',
})
export class CardMobileComponent {
  @Input() film!: IFilm;
}
