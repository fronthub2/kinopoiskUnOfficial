import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs';
import { FilmsService } from '../../features/films/api/films.api.service';
import { IFilm, IResponce } from '../../shared/interface/films.interface';
import { ListFilmsComponent } from '../../shared/list-films/list-films.component';
import { SkeletonService } from '../../shared/services/skeleton.service';
import { TuiSkeleton } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collections',
  imports: [ListFilmsComponent, TuiSkeleton, AsyncPipe],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit, OnDestroy {
  private fimlsService = inject(FilmsService);
  private skeletonService = inject(SkeletonService);
  private _films = new BehaviorSubject<IFilm[]>([]);
  private _destroy = new Subject<void>();

  films$ = this._films.asObservable();
  isSkeleton$ = this.skeletonService.getSkeleton();

  totalPages: number = 0;
  page: number = 0;

  ngOnInit() {
    this.getCollectionsFilms();
  }

  getCollectionsFilms(page: number = 1): void {
    this.fimlsService
      .getCollectionsFilms(page)
      .pipe(
        //подумать
        tap((resp) => {
          this.totalPages = resp.totalPages;
        }),
        map((resp: IResponce) => resp.items),
        takeUntil(this._destroy)
      )
      .subscribe({
        next: (films: IFilm[]) => this._films.next(films),
        error: (err) => console.log(err),
      });
  }

  goToPage(page: number): void {
    this.getCollectionsFilms(page + 1);
    this.page = page;
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
