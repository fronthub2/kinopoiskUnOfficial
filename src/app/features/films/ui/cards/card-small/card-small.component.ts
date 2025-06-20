import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { IFilm } from '../../../../../shared/interface/films.interface';
import { GenresPipe } from '../../../../../shared/pipes/genres.pipe';
import { SliceTextPipe } from '../../../../../shared/pipes/slice-text.pipe';
import { IconButtonComponent } from '../../../../../shared/ui/icon-button/icon-button.component';

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
