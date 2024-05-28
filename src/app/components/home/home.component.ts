import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InfoDialog } from './info-dialog/info-dialog';
import { StockDataService } from 'src/app/services/stock-data.service';



@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatTableModule, MatButtonModule, MatToolbarModule, NgxChartsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule]
})
export class HomeComponent {
  crowdstrikeData: any;
  berkshire_hathawayData: any
  healthcare_industryData: any
  microsoft: any
  petroleum_industry: any
  technology_industry: any
  bayer: any
  industries: any = []
  parsedData: any
  polarityChartData: any = []
  stockChartData: any = []
  tickerSymbols: any = [['CRWD', 'Crowdstrike'], ['BRK.B', 'Berkshire Hathaway B'], ['MSFT', 'Microsoft'],['BAYRY','Bayer AG'],['QQQ','Invesco QQQ Trust Series 1(Technology)'],['VGHCX','Vanguard Health Care Fund Investor Shares'],['XOP','SPDR S&P Oil & Gas Exploration & Production ETF ']];

  constructor(private supabaseService: SupabaseService, private router: Router, public dialog: MatDialog, private stockDataService: StockDataService) { }

  async ngOnInit() {
    await this.getArticleData();
    await this.parseDataToTable(this.crowdstrikeData, this.berkshire_hathawayData, this.healthcare_industryData, this.microsoft, this.petroleum_industry, this.technology_industry, this.bayer);
    this.setPolarityChart();
    await this.updateStockData();
    this.setStockChart();
  }

  async getArticleData() {
    this.crowdstrikeData = await this.supabaseService.getData('crowdstrike')
    this.berkshire_hathawayData = await this.supabaseService.getData('berkshire_hathaway')
    this.healthcare_industryData = await this.supabaseService.getData('healthcare_industry')
    this.microsoft = await this.supabaseService.getData('microsoft')
    this.petroleum_industry = await this.supabaseService.getData('petroleum_industry')
    this.technology_industry = await this.supabaseService.getData('technology_industry')
    this.bayer = await this.supabaseService.getData('bayer')
    this.industries.push([this.crowdstrikeData, 'Crowdstrike'], [this.berkshire_hathawayData, 'Berkshire Hathaway'], [this.healthcare_industryData, 'Healthcare Industry'], [this.microsoft, 'Microsoft'], [this.petroleum_industry, 'Petroleum Industry'], [this.technology_industry, 'Technology Industry'], [this.bayer, 'Bayer AG'])
  }

  async parseDataToTable(crowdstrike: any, berkshireHarhaway: any, healtcareIndustry: any, microsoft: any, petroleunIndustry: any, technologyIndustry: any, bayer: any) {

    let sum1: any = 0
    for (let i = 0; i < crowdstrike.length; i++) {
      sum1 = sum1 + crowdstrike[i].polarity
    }
    const meanPolarityOfCrowdstrike = sum1 / crowdstrike.length

    let sum2: any = 0
    for (let i = 0; i < berkshireHarhaway.length; i++) {
      sum2 = sum2 + berkshireHarhaway[i].polarity
    }
    const meanPolarityOfBerkshire = sum2 / berkshireHarhaway.length

    let sum3: any = 0
    for (let i = 0; i < healtcareIndustry.length; i++) {
      sum3 = sum3 + healtcareIndustry[i].polarity
    }
    const meanPolarityOfHealtcareIndustry = sum3 / healtcareIndustry.length

    let sum4: any = 0
    for (let i = 0; i < microsoft.length; i++) {
      sum4 = sum4 + microsoft[i].polarity
    }
    const meanPolarityOfMicrosoft = sum4 / microsoft.length

    let sum5: any = 0
    for (let i = 0; i < petroleunIndustry.length; i++) {
      sum5 = sum5 + petroleunIndustry[i].polarity
    }
    const meanPolarityOfPetroleumIndustry = sum5 / petroleunIndustry.length

    let sum6: any = 0
    for (let i = 0; i < technologyIndustry.length; i++) {
      sum6 = sum6 + technologyIndustry[i].polarity
    }
    const meanPolarityOfTechnologyIndustry = sum6 / technologyIndustry.length

    let sum7: any = 0
    for (let i = 0; i < bayer.length; i++) {
      sum7 = sum7 + bayer[i].polarity
    }
    const meanPolarityOfBayer = sum7 / bayer.length

    this.parsedData = [
      { industry: 'Crowdstrike', tableName: 'crowdstrike', polarity: meanPolarityOfCrowdstrike, numberOfArticles: crowdstrike.length },
      { industry: 'Berkshire Hathaway', tableName: 'berkshire_hathaway', polarity: meanPolarityOfBerkshire, numberOfArticles: berkshireHarhaway.length },
      { industry: 'Healthcare Industry', tableName: 'healthcare_industry', polarity: meanPolarityOfHealtcareIndustry, numberOfArticles: healtcareIndustry.length },
      { industry: 'Microsoft', tableName: 'microsoft', polarity: meanPolarityOfMicrosoft, numberOfArticles: microsoft.length },
      { industry: 'Petroleum Industry', tableName: 'petroleum_industry', polarity: meanPolarityOfPetroleumIndustry, numberOfArticles: petroleunIndustry.length },
      { industry: 'Technology Industry', tableName: 'technology_industry', polarity: meanPolarityOfTechnologyIndustry, numberOfArticles: technologyIndustry.length },
      { industry: 'Bayer AG', tableName: 'bayer', polarity: meanPolarityOfBayer, numberOfArticles: bayer.length },
    ]



    const tableSpinner = document.getElementById('table-spinner')
    tableSpinner?.style.setProperty('display', 'none');
    const table = document.getElementById('table')
    table?.style.setProperty('display', '')
  }

  columnsToDisplay = ['industry', 'polarity', 'numberOfArticles'];

  navigateToDashboard(industryName: any, tableName: any) {
    this.router.navigate(['dashboard', industryName, tableName]);
  }

  setPolarityChart() {
    let list = []
    for (const i of this.industries) {
      const objectX: { name: string, series: Array<{ name: Date, value: number }> } = { name: i[1], series: [] };

      // Create a map to store the total polarities and count of articles per day
      const dailyData: Map<string, { totalPolarity: number, articleCount: number }> = new Map();

      for (const article of i[0]) {
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
        objectX.series.push({
          name: new Date(date), // Convert string back to Date for the chart
          value: averagePolarity
        });
      }
      list.push(objectX);
    }
    this.polarityChartData = list

    const chartSpinner = document.getElementById('polarity-chart-spinner')
    chartSpinner?.style.setProperty('display', 'none');
    const chart = document.getElementById('polarity-chart')
    chart?.style.setProperty('display', 'flex')
  }

  async setStockChart() {
    let list = []
    for (const industry of this.tickerSymbols) {
      const objectX: { name: string, series: Array<{ name: Date, value: number }> } = { name: industry[1], series: [] };
      const data: any = await this.supabaseService.getDataWithFilter('stock_data', 'industry', industry[0])
      for (const i of data) {
        objectX.series.push({
          name: new Date(i.date), // Convert string back to Date for the chart
          value: i.value
        });
      }
      list.push(objectX)
    }
    this.stockChartData = list
    console.log(this.stockChartData)
    const chartSpinner = document.getElementById('stock-chart-spinner')
    chartSpinner?.style.setProperty('display', 'none');
    const chart = document.getElementById('stock-chart')
    chart?.style.setProperty('display', 'flex')
  }

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition = 'below'
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Polarity';
  timeline = true;

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

   async updateStockData(){
    for (const industry of this.tickerSymbols) {
       await this.stockDataService.getStockData(industry[0])
    }
    console.log('Stock data updated')
  }

  openDialog() {
    this.dialog.open(InfoDialog);
  }
}
