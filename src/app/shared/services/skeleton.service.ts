import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkeletonService {
  private _isSkeleton = new BehaviorSubject<boolean>(false);
  private _isSkeletonCardDropDown = new BehaviorSubject<boolean>(false);

  getSkeleton(): Observable<boolean> {
    return this._isSkeleton.asObservable();
  }

  setSkeleton(value: boolean): void {
    this._isSkeleton.next(value);
    if (value) {
      timer(700)
        .pipe(take(1))
        .subscribe(() => {
          this._isSkeletonCardDropDown.next(false);
        });
    }
  }

  getSkeletonCardDropDown(): Observable<boolean> {
    return this._isSkeletonCardDropDown.asObservable();
  }

  setSkeletonCardDropDown(value: boolean): void {
    this._isSkeletonCardDropDown.next(value);
    if (value) {
      timer(700)
        .pipe(take(1))
        .subscribe(() => {
          this._isSkeletonCardDropDown.next(false);
        });
    }
  }
}
