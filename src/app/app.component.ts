import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { LoaderService } from './shared/services/loader.service';
import { SkeletonService } from './shared/services/skeleton.service';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiRoot, LoaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private skeletonService = inject(SkeletonService);
  private loaderService = inject(LoaderService);
  private router = inject(Router);

  loader$ = this.loaderService.getLoader();

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart:
          this.loaderService.setLoader(true);
          this.skeletonService.setSkeleton(true);
          break;

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          setTimeout(() => this.loaderService.setLoader(false), 1500);
          setTimeout(() => this.skeletonService.setSkeleton(false), 2000);
          break;
      }
    });
  }
}
