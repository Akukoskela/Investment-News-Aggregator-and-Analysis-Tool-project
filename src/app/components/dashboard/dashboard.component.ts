import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, NgxChartsModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  articles: any;
  industryName: any;
  tableName: any;
  polarity: any;
  numberOfArticles: any;
  top5GoodArticles: any;
  top5BadArticles: any;
  lineChartData: any;

  constructor(private supabaseService: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.industryName = params['industryName'];
      this.tableName = params['tableName']
    });
    await this.getNews();
    this.setChart();
    console.log('chart data: ', this.lineChartData)
    console.log('example data: ', [
      {
        "name": "France",
        "series": [
          {
            "value": 4407,
            "name": "2016-09-19T05:35:52.103Z"
          },
          {
            "value": 3683,
            "name": "2016-09-21T03:37:21.998Z"
          },
          {
            "value": 4279,
            "name": "2016-09-22T18:56:04.479Z"
          },
          {
            "value": 4538,
            "name": "2016-09-23T23:18:28.296Z"
          },
          {
            "value": 6851,
            "name": "2016-09-22T06:57:22.626Z"
          }
        ]
      }])
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


  setChart() {
    this.lineChartData = []
    const objectX: { name: String, series: Array<object> } = { name: this.industryName, series: [] };
    for (const i of this.articles) {
      const object: { name: Date, value: Number } = { name: new Date(2024, 2, 5), value: 1 };

      const dateString = i.published_at;

      // Convert the date string to a Date object
      let dateObject = new Date(dateString);

      // Convert the Date object to an ISO 8601 string
      object.name = dateObject


      const polarity = i.polarity
      object.value = parseFloat(polarity)
      objectX.series.push(object)
    }
    this.lineChartData.push(objectX)

  }

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Polarity';
  timeline = true;
}
