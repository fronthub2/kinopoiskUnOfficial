import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-not-found-pages',
  imports: [TuiButton,RouterLink],
  templateUrl: './not-found-pages.component.html',
  styleUrl: './not-found-pages.component.scss'
})
export class NotFoundPagesComponent {

}
