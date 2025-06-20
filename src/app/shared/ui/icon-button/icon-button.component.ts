import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { IFilm } from '../../interface/films.interface';

@Component({
  selector: 'app-icon-button',
  imports: [TuiButton],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input() icon: string = 'heart';
  @Input() size: 's' | 'm' | 'l' | 'xl' | 'xs' = 'xs';
  @Input() film!: IFilm;
  @Input() color!: string;
  @Input() offsetTop!: string;
  @Input() offsetRight!: string;
  @Output() favoriteFilm = new EventEmitter<IFilm>();
  
  addFavorite(film: IFilm) {
    this.favoriteFilm.emit(film);
  }
}
