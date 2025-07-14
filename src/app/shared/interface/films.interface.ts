import { Observable } from 'rxjs';

export type ProffessionKey =
  | 'DIRECTOR'
  | 'ACTOR'
  | 'PRODUCER'
  | 'WRITER'
  | 'OPERATOR'
  | 'DESIGN'
  | 'EDITOR';

export interface IGenre {
  genre: string;
}

export interface ICountry {
  country: string;
}

export interface IFilm {
  countries: ICountry[];
  coverUrl: string;
  description: string;
  genres: IGenre[];
  kinopoiskId: number;
  nameRu: string;
  posterUrlPreview: string;
  posterUrl: string;
  ratingKinopoisk: number | null;
  year: number;
  type: string;
}

export interface IStaff {
  staffId: number;
  nameRu: string;
  description: null;
  posterUrl: string;
  professionText: string;
  professionKey: ProffessionKey;
}

export interface IDialogFilm {
  film: IFilm;
  staff: Observable<IStaff[]>;
}

export interface IResponce {
  items: IFilm[];
  total: number;
  totalPages: number;
}
