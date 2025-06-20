import { Component, Input } from '@angular/core';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer } from '@angular/youtube-player';

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
  @Input() videoUrl!:string;
}
