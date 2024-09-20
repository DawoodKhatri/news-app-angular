import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class SearchComponent {
  faX = faX;

  @Output() querySearched = new EventEmitter<string>();
  @Input() query: string = '';

  onSearch() {
    if (this.query.trim() === '') return;
    this.querySearched.emit(this.query);
  }

  onClear() {
    this.query = '';
    this.querySearched.emit(this.query);
  }
}
