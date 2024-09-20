import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNewestStories(page: number = 1): Observable<any> {
    const apiUrl = new URL(this.apiBaseUrl + '/newest-stories');
    apiUrl.searchParams.append('page', page.toString());

    return this.http.get<any>(apiUrl.toString());
  }

  searchStories(query: string, page: number = 1): Observable<any> {
    const apiUrl = new URL(this.apiBaseUrl + '/search');
    apiUrl.searchParams.append('query', query);
    apiUrl.searchParams.append('page', page.toString());

    return this.http.get<any>(apiUrl.toString());
  }
}
