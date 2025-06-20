import { IFilm } from "./films.interface";

export interface IUser {
  name: string;
  favoritesFilms: IFilm[];
}
