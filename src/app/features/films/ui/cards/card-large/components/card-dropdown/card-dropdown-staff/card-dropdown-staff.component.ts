import { Component, Input } from '@angular/core';
import { TuiDropdown } from '@taiga-ui/core';
import { IStaff } from '../../../../../../../../shared/interface/films.interface';

@Component({
  selector: 'app-card-dropdown-staff',
  imports: [TuiDropdown],
  templateUrl: './card-dropdown-staff.component.html',
  styleUrl: './card-dropdown-staff.component.scss'
})
export class CardDropDownStaffComponent {
  @Input() staff!:IStaff;
}
