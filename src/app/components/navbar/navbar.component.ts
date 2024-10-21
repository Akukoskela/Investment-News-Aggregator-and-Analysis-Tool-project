import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  componentText: string = ''
  componentHeader: string = 'Finance news collector';
  componentHeader2: string = '';

  constructor(private router: Router) {}
  ngOnInit() {
    // Subscribe to NavigationEnd event to track route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))  // Only allow NavigationEnd events
      .subscribe((event: any) => {  // Use 'any' to avoid type conflict
        this.updateComponentTextBasedOnRoute(event.url);
      });
  }

    updateComponentTextBasedOnRoute(url: string) {
      // Check the current route URL and update component state
      if (url.includes('home')) {
        this.componentText = 'Welcome to Home';
        this.componentHeader = 'Home Page';
        this.componentHeader2 = 'This is the homepage.';
      } else if (url.includes('chat-bot')) {
        this.componentText = 'Chat Bot';
        this.componentHeader = 'Chat Bot Assistant';
        this.componentHeader2 = 'Start chatting with our AI assistant.';
      } else if (url.includes('news-dashboard')) {
        this.componentText = 'News Dashboard';
        this.componentHeader = 'Latest News';
        this.componentHeader2 = 'Check the latest headlines.';
      } else {
        this.componentText = 'Welcome';
        this.componentHeader = 'Main Page';
        this.componentHeader2 = 'Explore our application.';
      }
    }
 

}
