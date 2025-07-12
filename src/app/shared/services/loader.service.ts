import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader = new BehaviorSubject<boolean>(false);

  getLoader(): Observable<boolean> {
    return this._loader.asObservable();
  }

  setLoader(value: boolean): void {
    this._loader.next(value);
  }
}
