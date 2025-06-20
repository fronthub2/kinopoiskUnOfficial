import { Injectable } from '@angular/core';
import { IUser } from '../shared/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (!user) return null;
  
    try {
      return JSON.parse(user) as IUser;
    } catch (error) {
      console.error('Error parsing user in localStorage', error);
      return null;
    }
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser(): void {
    localStorage.removeItem('user');
  }
}
