import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './story-list.component.html',
})
export class StoryListComponent implements OnInit {
  faSpinner = faSpinner;
  stories: any[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = '';

  constructor(
    @Inject(NewsService) private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.queryParams
          .subscribe((params) => {
            const page = params['page'] ? +params['page'] : null;
            const search = params['search'] || '';

            if (!page) {
              this.onPageChanged(1);
              return;
            }

            this.currentPage = page as number;
            this.searchQuery = search;

            this.loadStories({ page: this.currentPage, query: search });
          })
          .unsubscribe();
      }
    });
  }

  async loadStories({ page = 1, query }: { page: number; query?: string }) {
    this.isLoading = true;

    if (query) {
      this.newsService
        .searchStories(query, page)
        .subscribe(({ meta, data }: { meta: any; data: any }) => {
          this.currentPage = meta.page;
          this.totalPages = meta.totalPages;

          this.stories = this.getFilteredStories(data.stories);

          this.isLoading = false;
        });
    } else {
      this.newsService
        .getNewestStories(page)
        .subscribe(({ meta, data }: { meta: any; data: any }) => {
          this.currentPage = meta.page;
          this.totalPages = meta.totalPages;

          this.stories = this.getFilteredStories(data.stories);

          this.isLoading = false;
        });
    }
  }

  getFilteredStories(stories: any[]) {
    return stories
      .filter((story: any) => story.url)
      .map((story: any) => {
        story.time = new Date(story.time * 1000).toDateString();

        if (story.url) {
          story.url = this.sanitizer.bypassSecurityTrustResourceUrl(story.url);
        }
        return story;
      });
  }

  onPageChanged(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(query: string) {
    this.searchQuery = query;

    if (query.trim() === '') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        // queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: query },
        // queryParamsHandling: 'merge',
      });
    }
  }
}
