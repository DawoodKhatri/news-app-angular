import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PaginationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChanged when onNext is called', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 1;
    component.totalPages = 3;
    component.onNext();
    expect(component.currentPage).toBe(2);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChanged when onPrevious is called', () => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 2;
    component.onPrevious();
    expect(component.currentPage).toBe(1);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
  });

  it('should emit pageChanged when onPageSelect is called', () => {
    spyOn(component.pageChanged, 'emit');
    component.onPageSelect(3);
    expect(component.currentPage).toBe(3);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(3);
  });
});
