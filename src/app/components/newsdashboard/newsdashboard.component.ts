import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SupabaseService } from 'src/app/services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StockDataService } from 'src/app/services/stock-data.service';
import { NgFor } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-newsdashboard',
  templateUrl: './newsdashboard.component.html',
  styleUrls: ['./newsdashboard.component.css'],
  imports: [MatToolbarModule, NgFor, MatTableModule, MatButtonModule, NgxChartsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatButtonToggleModule,MatMenuModule]
})
export class NewsdashboardComponent {
  articles: any = []
  industries = ['crowdstrike', 'bayer', 'berkshire_hathaway', 'healthcare_industry', 'technology_industry', 'microsoft', 'petroleum_industry']
  crowdstrikeArticles: any;
  bayerArticles: any;
  berkshire_hathawayArticles: any;
  healthcare_industryArticles: any;
  technology_industryArticles: any;
  microsoftArticles: any;
  petroleum_industryArticles: any;
  showArticles: any;
  testData: any;
  imageNotAvailableImage = 'assets/no-image-available-image.jpg';
  choosedIndustry: any;
  constructor(private supabaseService: SupabaseService,private route: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    /*
    this.crowdstrikeArticles = await this.supabaseService.getData('crowdstrike') //First we fetch the articles from the database and set Crowdstrike articles as the default value to be displayed. We use slice function to display only the first 20 articles so it downloads the content faster.
    this.showArticles = this.crowdstrikeArticles.slice(0, 20)
    this.choosedIndustry = 'Crowdstrike'
    this.bayerArticles = await this.supabaseService.getData('bayer')
    this.berkshire_hathawayArticles = await this.supabaseService.getData('berkshire_hathaway')
    this.healthcare_industryArticles = await this.supabaseService.getData('healthcare_industry')
    this.technology_industryArticles = await this.supabaseService.getData('technology_industry')
    this.microsoftArticles = await this.supabaseService.getData('microsoft')
    this.petroleum_industryArticles = await this.supabaseService.getData('petroleum_industry')

    */ 

     this.testData = [
       {
         "id": "335426c9-881d-4ed1-ab50-ca5766c2a50c",
         "published_at": "2024-07-21",
         "polarity": 0.8,
         "url": "https://biztoc.com/x/24acb3f665dca50c",
         "image_url": "https://biztoc.com/cdn/800/og.png",
         "source_name": "Biztoc.com",
         "description": "CrowdStrike Holdings (NASDAQ: CRWD) made headlines around the world on Friday -- but not for a reason the company or its shareholders were happy about. A faulty software update by the cybersecurity specialist led to an IT outage that impacted customers around…",
         "content": "CrowdStrike Holdings (NASDAQ: CRWD) made headlines around the world on Friday -- but not for a reason the company or its shareholders were happy about. A faulty software update by the cybersecurity specialist led to an IT outage that impacted customers around the world, from airlines to…\n\nThis story appeared on finance.yahoo.com , 2024-07-21.",
         "title": "After the Biggest IT Outage in History, Is CrowdStrike a Stock to Avoid...or a Bad-News Buy?",
         "subjectivity": 1,
         "info": null
       },
       {
         "id": "a1a4d2c8-ee57-4d84-a795-0c35ad008346",
         "published_at": "2024-07-23",
         "polarity": 0.75,
         "url": "https://www.doctorofcredit.com/targeted-amex-offer-crowdstrike-get-40-back/",
         "image_url": "https://www.doctorofcredit.com/wp-content/uploads/2020/05/amex-offer-1.png",
         "source_name": "Doctorofcredit.com",
         "description": "Get 40% back as a statement credit by using your enrolled eligible Card to make purchases online at crowdstrike.com/offer by 9/28/2024",
         "content": "You can help support this site by using our links to Amazon & eBay.\n\n\n\n\n\nAs an Amazon Associate I earn from qualifying purchases. Keep in mind that if you do use our links, you won’t be able to earn cash back/miles/points from shopping portals.\n\nIn the interests of our readers you can find out what shopping portal is offering the best rates on eBay here & Amazon here.",
         "title": "[Targeted] AmEx Offer: Crowdstrike, Get 40% Back",
         "subjectivity": 0.4625,
         "info": null
       },
       {
         "id": "e238da48-d2cd-440f-a6ab-bced83967711",
         "published_at": "2024-06-05",
         "polarity": 0.5833333333333334,
         "url": "https://biztoc.com/x/77ca127cea23f4ff",
         "image_url": "https://c.biztoc.com/p/77ca127cea23f4ff/s.webp",
         "source_name": "Biztoc.com",
         "description": "Good day, everyone, and thank you for standing by. Welcome to CrowdStrike fiscal first quarter 2025 results conference call. At this time, all participants are in a listen-only mode. After the speakers' presentation, there will be a question-and-answer sessio…",
         "content": "Good day, everyone, and thank you for standing by. Welcome to CrowdStrike fiscal first quarter 2025 results conference call. At this time, all participants are in a listen-only mode. After the speakers' presentation, there will be a question-and-answer session.\n\n[Operator instructions] Please be advised that today's conference is being recorded. I would now like to hand it…\n\nThis story appeared on aol.com",
         "title": "Q1 2025 Earnings Call Transcript",
         "subjectivity": 0.611111111111111,
         "info": null
       },
       {
         "id": "fce33039-f0ab-4f19-93fc-7c4b5a28a4db",
         "published_at": "2024-06-05",
         "polarity": 0.5,
         "url": "https://biztoc.com/x/774b60beb90a1ae3",
         "image_url": "https://c.biztoc.com/274/og.png",
         "source_name": "Biztoc.com",
         "description": "Hewlett Packard, CrowdStrike and more in the latest Market Talks covering Technology, Media and Telecom. #hewlettpackard #crowdstrike #markettalks #telecom",
         "content": "Hewlett Packard, CrowdStrike and more in the latest Market Talks covering Technology, Media and Telecom.\n\nThis story appeared on wsj.com , 2024-06-05.",
         "title": "Tech, Media & Telecom Roundup: Market Talk",
         "subjectivity": 0.7,
         "info": null
       },
       {
         "id": "e3d9831c-47e0-4f58-abf5-583c1db7aebe",
         "published_at": "2024-06-10",
         "polarity": 0.5,
         "url": "https://biztoc.com/x/1e8580cb3e2430d1",
         "image_url": "https://biztoc.com/cdn/799/og.png",
         "source_name": "Biztoc.com",
         "description": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers Barron's\nStocks making the biggest moves midday: LUV, GME, AMD CNBC\nStocks to Watch Monday: Nvidia, Apple, AMD, Southwest Airlines The Wall Street Journal\nMidday mo…",
         "content": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers Barron's\n\nStocks making the biggest moves midday: LUV, GME, AMD CNBC\n\nStocks to Watch Monday: Nvidia, Apple, AMD, Southwest Airlines The Wall Street Journal\n\nMidday movers: Southwest Airlines,…\n\nThis story appeared on barrons.com , 2024-06-10.",
         "title": "Nvidia, AMD, Southwest, GameStop, Apple, CrowdStrike, Diamond Offshore, and More Market Movers",
         "subjectivity": 0.5,
         "info": null
       }
     ]
  }

  navigateToHome(){
    this.router.navigate(['home']);
  }

  shorteningFunc(string: string, length: number) {
    if (string == null) {
      return '';
    }
    if (string.length > length) {
      return string.substring(0, length) + '...';
    }
    else {
      return string;
    }
  }

  showAlternativeImage(event: Event) {
    (event.target as HTMLImageElement).src = this.imageNotAvailableImage;

  }

  checkPolarity(polarity: number) {
    let sentiment: string;
    let color: string;

    if (polarity < -0.1) {
      sentiment = "sentiment_dissatisfied";
      color = "red";
    } else if (polarity < 0.1) {
      sentiment = "sentiment_neutral";
      color = "yellow";
    } else if (polarity > 0.1) {
      sentiment = "sentiment_very_satisfied";
      color = "green";
    } else {
      sentiment = "undefined";
      color = "black"; // Set default color or handle it according to your requirement
    }

    return { sentiment, color };
  }

  selectIndustry(event: any) {
    this.choosedIndustry = event.value;

    switch (this.choosedIndustry) {
      case 'Crowdstrike':
        this.showArticles = this.crowdstrikeArticles.slice(0, 20)
        break;
      case 'Bayer':
        this.showArticles = this.bayerArticles.slice(0, 20)
        break;
      case 'Berkshire Hathaway':
        this.showArticles = this.berkshire_hathawayArticles.slice(0, 20)
        break;
      case 'Healthcare industry':
        this.showArticles = this.healthcare_industryArticles.slice(0, 20)
        break;
      case 'Technology industry':
        this.showArticles = this.technology_industryArticles.slice(0, 20)
        break;
      case 'Microsoft':
        this.showArticles = this.microsoftArticles.slice(0, 20)
        break;
      case 'Petroleum industry':
        this.showArticles = this.petroleum_industryArticles.slice(0, 20)
        break;
    }
  }

  loadMoreArticles() {
    const numberOfArticles = this.showArticles.length;

    switch (this.choosedIndustry) {
      case 'Crowdstrike':
        this.showArticles = this.crowdstrikeArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Bayer':
        this.showArticles = this.bayerArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Berkshire Hathaway':
        this.showArticles = this.berkshire_hathawayArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Healthcare industry':
        this.showArticles = this.healthcare_industryArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Technology industry':
        this.showArticles = this.technology_industryArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Microsoft':
        this.showArticles = this.microsoftArticles.slice(0, numberOfArticles + 20)
        break;
      case 'Petroleum industry':
        this.showArticles = this.petroleum_industryArticles.slice(0, numberOfArticles + 20)
        break;
    }
  }


  /*async getNews() {
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
  }*/
}
