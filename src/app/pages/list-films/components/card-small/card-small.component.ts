import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { IFilm } from '../../../../interface/films.interface';
import { SliceTextPipe } from '../../../../pipes/slice-text.pipe';
import { GenresPipe } from '../../../../pipes/genres.pipe';
import { IconButtonComponent } from '../../../../shared/icon-button/icon-button.component';

@Component({
  selector: 'app-card-small',
  imports: [GenresPipe, SliceTextPipe, TuiIcon, IconButtonComponent],
  templateUrl: './card-small.component.html',
  styleUrl: './card-small.component.scss',
})
export class CardSmallComponent {
  @Input() film!: IFilm;
  @Input() isFavoriteFilm!: boolean | undefined;
  @Output() favoriteFilm = new EventEmitter<IFilm>();

  emitAddFavorite(film: IFilm) {
    this.favoriteFilm.emit(film);
  }
}
