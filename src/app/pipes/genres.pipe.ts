import { Pipe, PipeTransform } from '@angular/core';

interface IGenres {
  genre: string;
}

@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {

  transform(genres: IGenres[], lastIndex:number): string[] {
    const genre = genres.map((genre) => genre.genre).slice(0, lastIndex);

    return genre;
  }
}
