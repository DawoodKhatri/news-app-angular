import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, StoryListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'news-app-angular';
}
