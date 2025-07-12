import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { AuthService } from '../../api/auth.service';
import { ErrorNamePipe } from '../../pipes/error-name.pipe';

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
  private authService = inject(AuthService);
  private trigger$ = new Subject<void>();
  private _error = new BehaviorSubject<boolean>(false);

  error$ = this._error.asObservable();
  
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
        finalize(() => this.authService.login(this.form.value.name as string))
      )
    )
  );

  onSubmit() {
    if (this.form.invalid) {
      this._error.next(true);
      return;
    }
    this._error.next(false);
    this.trigger$.next();
  }
}
