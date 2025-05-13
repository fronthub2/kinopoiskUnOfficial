import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorName',
})
export class ErrorNamePipe implements PipeTransform {
  transform(error: ValidationErrors | null): string {
    if (!error) {
      return '';
    }

    if (error['required']) {
      return 'Укажите имя, это обязательно';
    }

    if (error['minlength']) {
      return 'Имя должно состоять минимум из 3 букв';
    }

    return 'Обратитесь в техподдержку';
  }
}
