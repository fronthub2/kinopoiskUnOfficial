import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiPagination } from '@taiga-ui/kit';

@Component({
  selector: 'app-pagination',
  imports: [TuiPagination],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() page!: number;
  @Output() changePage = new EventEmitter<number>();

  goToPage(page: number): void {
    this.changePage.emit(page);
  }
}
