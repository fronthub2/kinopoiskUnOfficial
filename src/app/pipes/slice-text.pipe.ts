import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
})
export class SliceTextPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) return 'Описание отсутствует';

    let index = 0;
    let lastIndex = -1;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '.') {
        index++;
        if (index === 2) {
          lastIndex = i;
          break;
        }
      }
    }

    if (index < 2) {
      return text;
    }

    return text.substring(0, lastIndex + 1);
  }
}
