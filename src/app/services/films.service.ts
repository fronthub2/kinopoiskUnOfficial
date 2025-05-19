import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IFilm {
  countries: { country: string }[];
  coverUrl: string;
  description: string;
  genres: { genre: string }[];
  kinopoiskId: string;
  nameRu: string;
  posterUrlPreview: string;
  ratingKinopoisk: number | null;
  year: number;
  type: string;
}

export interface IResponce {
  items: IFilm[];
  total: number;
  totalPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);

  private apiKey: string = 'f125c107-19c1-4160-a04e-f4545ac66ad6';
  private header = {
    'X-API-KEY': 'f125c107-19c1-4160-a04e-f4545ac66ad6',
    'Content-Type': 'application/json',
  };
  private baseUrl: string = 'https://kinopoiskapiunofficial.tech/api/v2.2/';
  private collectionsFilms: string =
    'films/collections?type=TOP_POPULAR_ALL&page=1';

  constructor() {}

  private getFilms(path: string): Observable<IResponce> {
    return this.http.get<IResponce>(`${this.baseUrl}${path}`, {
      headers: this.header,
    });
  }

  getCollectionsFilms(): Observable<IResponce> {
    return this.getFilms(this.collectionsFilms);
  }
}
