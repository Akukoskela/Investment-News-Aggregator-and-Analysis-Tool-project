import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';



@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatTableModule, MatButtonModule, MatToolbarModule,NgxChartsModule,MatIconModule]
})
export class HomeComponent {
  crowdstrikeData: any;
  berkshire_hathawayData: any
  healthcare_industryData: any
  microsoft: any
  petroleum_industry: any
  technology_industry: any

  parsedData: any

  constructor(private supabaseService: SupabaseService,private router: Router) { }

  async ngOnInit() {
    this.crowdstrikeData = await this.getData('crowdstrike')
    this.berkshire_hathawayData = await this.getData('berkshire_hathaway')
    this.healthcare_industryData = await this.getData('healthcare_industry')
    this.microsoft = await this.getData('microsoft')
    this.petroleum_industry = await this.getData('petroleum_industry')
    this.technology_industry = await this.getData('technology_industry')

    await this.parseDataToTable(this.crowdstrikeData,this.berkshire_hathawayData,this.healthcare_industryData,this.microsoft,this.petroleum_industry,this.technology_industry)
  }

  async getData(table: string) {
    return await this.supabaseService.getData(table);
  }

  async parseDataToTable(first: any,second:any,third:any,fourth:any,fifth:any,sixth:any) {

    let sum1: any = 0
    for (let i = 0; i < first.length; i++) {
      sum1 = sum1 + first[i].polarity
    }
    const meanPolarityOfFirst = sum1 / first.length

    let sum2: any = 0
    for (let i = 0; i < second.length; i++) {
      sum2 = sum2 + second[i].polarity
    }
    const meanPolarityOfSecond = sum2 / second.length

    let sum3: any = 0
    for (let i = 0; i < third.length; i++) {
      sum3 = sum3 + third[i].polarity
    }
    const meanPolarityOfThird = sum3 / third.length

    let sum4: any = 0
    for (let i = 0; i < fourth.length; i++) {
      sum4 = sum4 + fourth[i].polarity
    }
    const meanPolarityOfFourth = sum4 / fourth.length

    let sum5: any = 0
    for (let i = 0; i < fifth.length; i++) {
      sum5 = sum5 + fifth[i].polarity
    }
    const meanPolarityOfFifth = sum5 / fifth.length

    let sum6: any = 0
    for (let i = 0; i < sixth.length; i++) {
      sum6 = sum6 + sixth[i].polarity
    }
    const meanPolarityOfSixth = sum6 / sixth.length

    this.parsedData = [
      { industry: 'Crowdstrike',tableName:'crowdstrike', polarity: meanPolarityOfFirst, numberOfArticles: first.length },
      { industry: 'Berkshire Hathaway',tableName:'berkshire_hathaway', polarity: meanPolarityOfSecond, numberOfArticles: second.length },
      { industry: 'Healthcare Industry',tableName:'healthcare_industry', polarity: meanPolarityOfThird, numberOfArticles: third.length },
      { industry: 'Microsoft',tableName:'microsoft', polarity: meanPolarityOfFourth, numberOfArticles: fourth.length },
      { industry: 'Petroleum Industry',tableName:'petroleum_industry', polarity: meanPolarityOfFifth, numberOfArticles: fifth.length },
      { industry: 'Technology Industry',tableName:'technology_industry', polarity: meanPolarityOfSixth, numberOfArticles: sixth.length }
    ]

  }

  columnsToDisplay = ['industry', 'polarity', 'numberOfArticles'];

  navigateToDashboard(industryName: any,tableName:any) {
    this.router.navigate(['dashboard', industryName,tableName]);
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
  lineChartData: any = [
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
    }]
}
