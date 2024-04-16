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
  industryLogo: any
  infoText: any;

  constructor(private supabaseService: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.industryName = params['industryName'];
      this.tableName = params['tableName']
    });
    this.setLogoAndInfoText();
    await this.getNews();
    this.setChart();
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

  setLogoAndInfoText() {
    console.log(this.industryName);

    switch (this.industryName) {
      case "Crowdstrike":
        this.industryLogo = "/assets/crowdstrikeLogo.png"
        this.infoText='CrowdStrike is a cloud-based cybersecurity company specializing in next-generation security verticals such as endpoint, cloud workload, identity, and security operations. CrowdStrike’s primary offering is its Falcon platform that offers a proverbial single pane of glass for an enterprise to detect and respond to security threats attacking its IT infrastructure. The Texas-based firm was founded in 2011 and went public in 2019.'
        break;
      case "Microsoft":
        this.industryLogo = "/assets/microsoftLogo.png"
        this.infoText="Microsoft develops and licenses consumer and enterprise software. It is known for its Windows operating systems and Office productivity suite. The company is organized into three equally sized broad segments: productivity and business processes (legacy Microsoft Office, cloud-based Office 365, Exchange, SharePoint, Skype, LinkedIn, Dynamics), intelligence cloud (infrastructure- and platform-as-a-service offerings Azure, Windows Server OS, SQL Server), and more personal computing (Windows Client, Xbox, Bing search, display advertising, and Surface laptops, tablets, and desktops)."
        break;
      case "Berkshire Hathaway":
        this.industryLogo = "/assets/berkshire-hathawayLogo.png"
        this.infoText="Berkshire Hathaway is a holding company with a wide array of subsidiaries engaged in diverse activities. The firm's core business segment is insurance, run primarily through Geico, Berkshire Hathaway Reinsurance Group, and Berkshire Hathaway Primary Group. Berkshire has used the excess cash thrown off from these and its other operations over the years to acquire Burlington Northern Santa Fe (railroad), Berkshire Hathaway Energy (utilities and energy distributors), and the firms that make up its manufacturing, service, and retailing operations (which include five of Berkshire's largest noninsurance pretax earnings generators: Precision Castparts, Lubrizol, Clayton Homes, Marmon, and IMC/ISCAR). The conglomerate is unique in that it is run on a completely decentralized basis."
        break;
      case 'Healthcare Industry':
        this.industryLogo = "/assets/healthcare-industryLogo.png"
        this.infoText="The healthcare industry is critical for promoting, maintaining, and restoring health through the prevention, diagnosis, and treatment of disease. This industry is divided into Pharmaceuticals (focused on the development and production of medications), Medical Devices (encompassing the creation and supply of medical instruments and apparatuses), and Healthcare Services (including hospital care, nursing, and other healthcare provider services). This sector is characterized by a strong commitment to research and development, aiming to improve patient outcomes and the efficiency of healthcare delivery."
        break;
      case 'Petroleum Industry':
        this.industryLogo = "/assets/petroleum-industryLogo.png"
        this.infoText="The petroleum industry, also known as the oil and gas industry, is involved in the global processes of exploration, extraction, refining, transporting, and marketing petroleum products. The main areas of this industry include the Upstream sector (which deals with exploration and production of oil and natural gas), Midstream (focusing on transportation and storage of crude oil and gases), and Downstream (which involves the refining of crude oil and processing of raw natural gas into marketable products and chemicals). This industry is crucial for the global energy supply and is heavily invested in exploring sustainable and environmentally friendly energy practices to mitigate environmental impact."
        break;
      case "Technology Industry":
        this.industryLogo = "/assets/technology-industryLogo.png"
        this.infoText="The technology industry is a vast and rapidly evolving sector that encompasses a range of products and services aimed at enhancing and facilitating digital and computational processes. This industry can be broadly segmented into Hardware (including the manufacturing of electronic devices, computers, and telecommunications equipment), Software (ranging from system and application software to cloud computing and AI solutions), and Services (such as IT consulting, data processing, and hosting services). Companies within this sector are pivotal in driving innovation, with a focus on continuous improvement of connectivity, processing power, and user accessibility."
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
}
