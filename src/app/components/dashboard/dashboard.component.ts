import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { checkPolarity } from 'src/app/app.component';
import { ArticlePopupWindowComponent } from '../newsdashboard/article-popup-window/article-popup-window.component';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  imports: [MatDialogModule,CommonModule, RouterModule, MatToolbarModule, MatIconModule, NgxChartsModule, MatTooltipModule, MatProgressSpinnerModule],
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
  industryLogo: any
  infoText: any;
  ticker: any;
  stockName: any;
  stockData: any;

  constructor(public dialog:MatDialog,private supabaseService: SupabaseService, private route: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.industryName = params['industryName'];
      this.tableName = params['tableName']
    });
    window.scrollTo({top:0,behavior:'smooth'}) // Make sure the user starts from top of the component
    this.setLogoAndInfoText();
    await this.getNews();
    await this.getStockData();
    this.setChart();
  }

  navigateToHome(){
    this.router.navigate(['home']);
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
    console.log(this.top5GoodArticles);
    this.top5BadArticles = await this.supabaseService.getTop5BadNews(this.tableName);
  }

  async getStockData() {
    switch (this.industryName) {
      case "Crowdstrike":
        this.ticker = "CRWD"
        this.stockName = "CrowdStrike A"
        break;
      case "Microsoft":
        this.ticker = "MSFT"
        this.stockName = "Microsoft"
        break;
      case "Berkshire Hathaway":
        this.ticker = "BRK.B"
        this.stockName = "Berkshire Hathaway B"
        break;
      case 'Healthcare Industry':
        this.ticker = 'VGHCX'
        this.stockName = 'Vanguard Health Care Fund Investor Shares'
        break;
      case 'Petroleum Industry':
        this.ticker = 'XOP'
        this.stockName = 'SPDR S&P Oil & Gas Exploration & Production ETF'
        break;
      case "Technology Industry":
        this.ticker = 'QQQ'
        this.stockName = 'Invesco QQQ Trust Series 1'
        break;
      case "Bayer AG":
        this.ticker = 'BAYRY'
        this.stockName = 'Bayer AG'
        break;
    }
    this.stockData = await this.supabaseService.getDataWithFilter('stock_data', 'industry', this.ticker,false)
  }


  async setChart() {
    this.lineChartData = [];
    const polarityObject: { name: string, series: Array<{ name: Date, value: number }> } = { name: 'Polarity', series: [] };

    // Create a map to store the total polarities and count of articles per day
    const dailyData: Map<string, { totalPolarity: number, articleCount: number }> = new Map();

    for (const article of this.articles) {
      const dateString = new Date(article.published_at).toISOString().slice(0, 10); // Get the date in 'YYYY-MM-DD' format

      if (!dailyData.has(dateString)) {
        dailyData.set(dateString, { totalPolarity: 0, articleCount: 0 });
      }

      let dailyInfo = dailyData.get(dateString);
      dailyInfo!.totalPolarity += parseFloat(article.polarity);
      dailyInfo!.articleCount++;
    }

    // Variables to accumulate total polarities and counts across days
    let cumulativePolarity = 0;
    let cumulativeCount = 0;

    // Create the series data by iterating over the sorted dates
    const sortedDates = Array.from(dailyData.keys()).sort();
    for (const date of sortedDates) {
      const dailyInfo = dailyData.get(date);
      cumulativePolarity += dailyInfo!.totalPolarity;
      cumulativeCount += dailyInfo!.articleCount;

      const averagePolarity = cumulativePolarity / cumulativeCount;
      polarityObject.series.push({
        name: new Date(date), // Convert string back to Date for the chart
        value: averagePolarity* this.stockData[0].value *6 //Here we normalize the polarity data so it looks better in chart next to the share value. It takes the first share value from the database and multiplies polarity value by it. Then it multiplies it by 6 so it looks good in the chart.
      });
    }
    this.lineChartData.push(polarityObject);

    // Here we add the stock data
    const stockObject: { name: string, series: Array<{ name: Date, value: number }> } = { name: this.stockName, series: [] };
     for (const i of this.stockData) {
       stockObject.series.push({
         name: new Date(i.date), // Convert string back to Date for the chart
         value: i.value
       });
     }
 
    this.lineChartData.push(stockObject);
    console.log(this.lineChartData);

    const chartSpinner = document.getElementById('chart-spinner')
    chartSpinner?.style.setProperty('display', 'none');
    const chart = document.getElementById('chart')
    chart?.style.setProperty('display', 'flex')
  }

  setLogoAndInfoText() {
    console.log(this.industryName);

    switch (this.industryName) {
      case "Crowdstrike":
        this.industryLogo = "/assets/crowdstrikeLogo.png"
        this.infoText = 'CrowdStrike is a cloud-based cybersecurity company specializing in next-generation security verticals such as endpoint, cloud workload, identity, and security operations. CrowdStrike’s primary offering is its Falcon platform that offers a proverbial single pane of glass for an enterprise to detect and respond to security threats attacking its IT infrastructure. The Texas-based firm was founded in 2011 and went public in 2019.'
        break;
      case "Microsoft":
        this.industryLogo = "/assets/microsoftLogo.png"
        this.infoText = "Microsoft develops and licenses consumer and enterprise software. It is known for its Windows operating systems and Office productivity suite. The company is organized into three equally sized broad segments: productivity and business processes (legacy Microsoft Office, cloud-based Office 365, Exchange, SharePoint, Skype, LinkedIn, Dynamics), intelligence cloud (infrastructure- and platform-as-a-service offerings Azure, Windows Server OS, SQL Server), and more personal computing (Windows Client, Xbox, Bing search, display advertising, and Surface laptops, tablets, and desktops)."
        break;
      case "Berkshire Hathaway":
        this.industryLogo = "/assets/berkshire-hathawayLogo.png"
        this.infoText = "Berkshire Hathaway is a holding company with a wide array of subsidiaries engaged in diverse activities. The firm's core business segment is insurance, run primarily through Geico, Berkshire Hathaway Reinsurance Group, and Berkshire Hathaway Primary Group. Berkshire has used the excess cash thrown off from these and its other operations over the years to acquire Burlington Northern Santa Fe (railroad), Berkshire Hathaway Energy (utilities and energy distributors), and the firms that make up its manufacturing, service, and retailing operations (which include five of Berkshire's largest noninsurance pretax earnings generators: Precision Castparts, Lubrizol, Clayton Homes, Marmon, and IMC/ISCAR). The conglomerate is unique in that it is run on a completely decentralized basis."
        break;
      case 'Healthcare Industry':
        this.industryLogo = "/assets/healthcare-industryLogo.png"
        this.infoText = "The healthcare industry is critical for promoting, maintaining, and restoring health through the prevention, diagnosis, and treatment of disease. This industry is divided into Pharmaceuticals (focused on the development and production of medications), Medical Devices (encompassing the creation and supply of medical instruments and apparatuses), and Healthcare Services (including hospital care, nursing, and other healthcare provider services). This sector is characterized by a strong commitment to research and development, aiming to improve patient outcomes and the efficiency of healthcare delivery."
        break;
      case 'Petroleum Industry':
        this.industryLogo = "/assets/petroleum-industryLogo.png"
        this.infoText = "The petroleum industry, also known as the oil and gas industry, is involved in the global processes of exploration, extraction, refining, transporting, and marketing petroleum products. The main areas of this industry include the Upstream sector (which deals with exploration and production of oil and natural gas), Midstream (focusing on transportation and storage of crude oil and gases), and Downstream (which involves the refining of crude oil and processing of raw natural gas into marketable products and chemicals). This industry is crucial for the global energy supply and is heavily invested in exploring sustainable and environmentally friendly energy practices to mitigate environmental impact."
        break;
      case "Technology Industry":
        this.industryLogo = "/assets/technology-industryLogo.png"
        this.infoText = "The technology industry is a vast and rapidly evolving sector that encompasses a range of products and services aimed at enhancing and facilitating digital and computational processes. This industry can be broadly segmented into Hardware (including the manufacturing of electronic devices, computers, and telecommunications equipment), Software (ranging from system and application software to cloud computing and AI solutions), and Services (such as IT consulting, data processing, and hosting services). Companies within this sector are pivotal in driving innovation, with a focus on continuous improvement of connectivity, processing power, and user accessibility."
        break;
      case "Bayer AG":
        this.industryLogo = "/assets/bayerLogo.png"
        this.infoText = "Bayer is a German healthcare and agriculture conglomerate. Healthcare provides close to half of the company's sales and includes pharmaceutical drugs as well as vitamins and other consumer healthcare products. The firm also has a crop science business that includes seeds, pesticides, herbicides, and fungicides, which was expanded through the acquisition of Monsanto."
        break;
      default:

    }



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
  showRightYAxisLabel: boolean = true;
  yAxisLabelRight: string = "Utilization";

  checkPolarity(polarity: number) {
   return checkPolarity(polarity);
  }

  openArticlePopupwindow(article: any){
    console.log(article)

    const dialogRef = this.dialog.open(ArticlePopupWindowComponent, {
      data: {title: article.title, description: article.description, content: article.content, sourceName: article.source_name, publishedAt: article.published_at, imageUrl: article.image_url, url: article.url, polarity:article.polarity}, width:'70%'
    });

  }
}
