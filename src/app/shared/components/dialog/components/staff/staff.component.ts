import { Component, Input } from '@angular/core';
import { TuiDropdown } from '@taiga-ui/core';
import { IStaff } from '../../../../../interface/films.interface';

@Component({
  selector: 'app-staff',
  imports: [TuiDropdown],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent {
  @Input() staff!: IStaff;
}
