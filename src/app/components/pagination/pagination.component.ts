import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  onPageSelect(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}
