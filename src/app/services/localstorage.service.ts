import { Injectable } from '@angular/core';

export interface IUser {
  name: string;
  favoritesFilms: [];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (!user) return null;

    return JSON.parse(user);
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem('user');
  }
}
