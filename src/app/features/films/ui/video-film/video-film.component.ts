import { Component, inject } from '@angular/core';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer } from '@angular/youtube-player';
import { TuiDialogContext } from '@taiga-ui/core';
import {
  POLYMORPHEUS_CONTEXT,
} from '@taiga-ui/polymorpheus';
import { FilmsService } from '../../api/films.api.service';

@Component({
  selector: 'app-video-film',
  imports: [YouTubePlayer],
  templateUrl: './video-film.component.html',
  styleUrl: './video-film.component.scss',
  providers: [
    {
      provide: YOUTUBE_PLAYER_CONFIG,
      useValue: {
        loadApi: true,
      },
    },
  ],
})
export class VideoFilmComponent {
  private dialogContext = inject<TuiDialogContext<void, any>>(POLYMORPHEUS_CONTEXT);
  private filmService = inject(FilmsService);

  videoId!:number;

  constructor() {
    this.filmService.getTrailerFilm(this.dialogContext.data.filmId).subscribe({
      next: (id) => this.videoId = id 
    })
  }
}
