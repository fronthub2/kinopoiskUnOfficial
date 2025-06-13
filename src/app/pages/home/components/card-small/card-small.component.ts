import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { IFilm } from '../../../../interface/films.interface';
import { SliceTextPipe } from '../../../../pipes/slice-text.pipe';
import { GenresPipe } from '../../../../pipes/genres.pipe';

@Component({
  selector: 'app-card-small',
  imports: [GenresPipe, SliceTextPipe, TuiButton, TuiIcon],
  templateUrl: './card-small.component.html',
  styleUrl: './card-small.component.scss',
})
export class CardSmallComponent {
  @Input() film!: IFilm;
  @Input() isFavoriteFilm!: boolean | undefined;
  @Output() favoriteFilm = new EventEmitter<IFilm>();

  addFavorite(film: IFilm) {
    this.favoriteFilm.emit(film);
  }
}
