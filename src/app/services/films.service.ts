import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponce, IStaff } from '../interface/films.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);

  private apiKey: string = 'abf28bc7-2cbe-4d5c-8bfb-82dcce1d01a3';
  private header = {
    'X-API-KEY': this.apiKey,
    'Content-Type': 'application/json',
  };
  private baseUrl: string = 'https://kinopoiskapiunofficial.tech/api';

  private getRequest<T>(version: 'v1' | 'v2.2', path: string): Observable<T> {
    const url = `${this.baseUrl}/${version}/${path}`;

    return this.http.get<T>(url, {
      headers: this.header,
    });
  }

  getCollectionsFilms(page: number): Observable<IResponce> {
    const endpoint = `films/collections?type=TOP_POPULAR_ALL&page=${page}`;

    return this.getRequest<IResponce>('v2.2', endpoint);
  }

  getStaffFilm(filmId: number): Observable<IStaff[]> {
    const endpoint = `staff?filmId=${filmId}`;
    return this.getRequest<IStaff[]>('v1', endpoint);
  }
}

// сделать компонент list-film переиспользованным, вызывать его в компонентах и передавать api для рендеринга карточек
