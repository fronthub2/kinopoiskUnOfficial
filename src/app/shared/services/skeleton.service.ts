import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkeletonService {
  private _isSkeleton = new BehaviorSubject<boolean>(false);

  getSkeleton(): Observable<boolean> {
    return this._isSkeleton.asObservable();
  }

  setSkeleton(value: boolean):void {
    this._isSkeleton.next(value);
  }
}
