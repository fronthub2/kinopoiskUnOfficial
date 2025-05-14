import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TUI_FALSE_HANDLER } from '@taiga-ui/cdk';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm } from '@taiga-ui/layout';
import {
  BehaviorSubject,
  finalize,
  map,
  startWith,
  Subject,
  switchMap,
  timer,
} from 'rxjs';
import { ErrorNamePipe } from '../../pipes/error-name.pipe';
import {
  IUser,
  LocalStorageService,
} from '../../services/localstorage.service';

@Component({
  selector: 'app-login',
  imports: [
    TuiCardLarge,
    TuiAppearance,
    TuiForm,
    ReactiveFormsModule,
    TuiTextfield,
    TuiButton,
    TuiButtonLoading,
    AsyncPipe,
    TuiError,
    ErrorNamePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private trigger$ = new Subject<void>();
  isError$ = new BehaviorSubject<boolean>(false);

  private router = inject(Router);
  private lsService = inject(LocalStorageService);

  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    },
    {
      updateOn: 'submit',
    }
  );

  loading$ = this.trigger$.pipe(
    switchMap(() =>
      timer(2000).pipe(
        map(TUI_FALSE_HANDLER),
        startWith('Loading'),
        finalize(() => {
          const user: IUser = {
            name: this.form.controls.name.value as string,
            favoritesFilms: [],
          };
          this.lsService.setUser(user);
          this.router.navigate(['']);
          this.form.reset();
        })
      )
    )
  );

  onSubmit() {
    if (this.form.invalid) {
      this.isError$.next(true);
      return;
    }
    this.isError$.next(false);
    this.trigger$.next();
  }
}
