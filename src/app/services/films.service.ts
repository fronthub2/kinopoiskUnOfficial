import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponce, IStaff } from '../interface/films.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);

  private apiKey: string = 'f125c107-19c1-4160-a04e-f4545ac66ad6';
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
