import { Pipe, PipeTransform } from '@angular/core';
import { IStaff, ProffessionKey } from '../../../shared/interface/films.interface';

@Pipe({
  name: 'staff'
})
export class StaffPipe implements PipeTransform {

  transform(staff:IStaff[], proffession: ProffessionKey, lastIndex:number): string[] {
    const updateStaff = staff
    .filter((sf) => sf.professionKey === proffession)
    .slice(0, lastIndex)
    .map((sf) => sf.nameRu);
    
    return updateStaff;
  }

}
