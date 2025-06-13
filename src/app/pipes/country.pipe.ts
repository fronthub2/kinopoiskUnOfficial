import { Pipe, PipeTransform } from '@angular/core';
import { ICountry } from '../interface/films.interface';

@Pipe({
  name: 'country',
})
export class CountryPipe implements PipeTransform {
  transform(countries: ICountry[], lastIndex: number): string[] {
    const country = countries
      .map((country) => country.country)
      .slice(0, lastIndex);

    return country;
  }
}
