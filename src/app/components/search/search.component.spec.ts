import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit query when search button is clicked', () => {
    spyOn(component.querySearched, 'emit');
    component.query = 'test';
    component.onSearch();
    expect(component.querySearched.emit).toHaveBeenCalledWith('test');
  });

  it('should clear the query when clear button is clicked', () => {
    spyOn(component.querySearched, 'emit');
    component.query = 'test';
    component.onClear();
    expect(component.query).toBe('');
    expect(component.querySearched.emit).toHaveBeenCalledWith('');
  });
});
