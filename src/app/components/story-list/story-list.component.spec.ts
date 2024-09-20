import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { NewsService } from '../../services/news.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let newsService: NewsService;
  let mockRouter: { events: Subject<any>; navigate: jasmine.Spy };

  beforeEach(async () => {
    const newsServiceMock = {
      getNewestStories: jasmine
        .createSpy('getNewestStories')
        .and.returnValue(
          of({ meta: { page: 1, totalPages: 1 }, data: { stories: [] } })
        ),
      searchStories: jasmine
        .createSpy('searchStories')
        .and.returnValue(
          of({ meta: { page: 1, totalPages: 1 }, data: { stories: [] } })
        ),
    };

    mockRouter = {
      events: new Subject<any>(),
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [StoryListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ page: 1 }) },
        },
        { provide: NewsService, useValue: newsServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
    fixture.detectChanges();
  });

  it('should create the StoryListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on init', async () => {
    component.ngOnInit();

    mockRouter.events.next(
      new NavigationEnd(0, 'http://localhost/', 'http://localhost/')
    );
    await fixture.whenStable();

    expect(newsService.getNewestStories).toHaveBeenCalled();
  });

  it('should handle search functionality', async () => {
    component.onSearch('test');
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { search: 'test' },
      relativeTo: jasmine.any(Object),
    });
  });

  it('should handle pagination', () => {
    component.onPageChanged(2);

    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 2 },
      queryParamsHandling: 'merge',
      relativeTo: jasmine.any(Object),
    });
  });
});
