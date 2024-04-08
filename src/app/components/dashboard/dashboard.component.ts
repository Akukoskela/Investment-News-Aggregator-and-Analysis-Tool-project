import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule,MatIconModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  articles: any;
  industryName: any;
  tableName:any;
  polarity: any;
  numberOfArticles: any;
  top5GoodArticles: any;
  top5BadArticles: any;

  constructor(private supabaseService: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.industryName = params['industryName'];
      this.tableName=params['tableName']
    });
    await this.getNews();
    console.log('good: ',this.top5GoodArticles)
    console.log('bad: ',this.top5BadArticles)
  }

  async getNews() {
    // Using supabaseService to get news/articles from database
    this.articles = await this.supabaseService.getData(this.tableName);
    this.numberOfArticles = this.articles.length

    // Setting up the polarity of industry
    let sum: any = 0
    for (let i = 0; i < this.articles.length; i++) {
      sum = sum + this.articles[i].polarity
    }
    const polarity = sum / this.articles.length
    this.polarity = polarity.toFixed(4)

    // Setting up top 5 good and bad news
    this.top5GoodArticles = await this.supabaseService.getTop5GoodNews(this.tableName);
    this.top5BadArticles = await this.supabaseService.getTop5BadNews(this.tableName);
  }

}
