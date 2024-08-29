import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseKeys } from './supabaseKeys';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {
  // Array of stock symbols and their names
  tickerSymbols: any = [['CRWD', 'Crowdstrike'], ['BRK.B', 'Berkshire Hathaway B'], ['MSFT', 'Microsoft'], ['BAYRY', 'Bayer AG'], ['QQQ', 'Invesco QQQ Trust Series 1(Technology)'], ['VGHCX', 'Vanguard Health Care Fund Investor Shares'], ['XOP', 'SPDR S&P Oil & Gas Exploration & Production ETF ']];

  constructor(private supabaseService: SupabaseService) { }

  async getStockData(industry: string) {
    // Checks if data exists for todays date. This way we don't need to call the api everytime. We have the free version of Alpha vantage which only allows 25 calls per day
    const today = new Date();
    if (today.getDay() == 0 || today.getDay() == 6) { //Here we check if its the weekend and if it is we dont need to update the data because stock market is closed
      console.log('Weekend, no data to update')
    }
    else {
      // First we get the yesterdays date and format it to the same format as in database.
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const date = yesterday.toISOString().split('T')[0];
      // Check if the stock data already exists in the database.
      const dataExists = await this.supabaseService.checkIfDataExists('stock_data', 'industry', industry, 'date', date);
      console.log('Stock data for ', industry, ' for date: ', date, '. Dataexits: ', dataExists)
      // If data doesn't exists we make a API reguest to Alpha Vantage and send the data to the database.

//Get the latest date from the database where we have stock data for the industry
const data:any= await this.supabaseService.getDataWithFilter('stock_data', 'industry', industry, false)
const latestDateWithData=data[0].date




      if (dataExists == false) {
        const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=' + industry + '&apikey=CZMPMMVGN67FVB2W');
        const data = await response.json();
        if (data["Information"] == 'Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.') {
          console.log('API limit reached')
        }
        else {
          // Access the "Time Series (Daily)" sub-object
          const dailyPrices = data["Time Series (Daily)"];
          // Loop through each date (key) and its corresponding daily price object (value)
          for (const date in dailyPrices) {
            if (new Date(date) < new Date(latestDateWithData)) {
              continue;
            }

            const dailyPrice = dailyPrices[date];
            
            // Check again if data already exits in the database and send it if it doesn't.
            const dataExists = await this.supabaseService.checkIfDataExists('stock_data', 'industry', industry, 'date', date);
            //console.log('Second log: Data exists for ',industry,' for ',date,':', dataExists)
            if (dataExists == false) {
              // Access and process individual properties within the daily price object
              const closePrice = parseFloat(dailyPrice["4. close"]);
              const volume = parseFloat(dailyPrice["5. volume"]);
              await this.supabaseService.sendData('stock_data', industry, date, closePrice, volume);
              console.log('Stock data sent to database for ', industry, ' on ', date)
            }
          }
        }
      }
    }
  }
}
