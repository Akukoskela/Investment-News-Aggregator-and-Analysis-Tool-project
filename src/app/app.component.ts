import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Investment-News-Aggregator-and-Analysis-Tool-project';
}

  export function checkPolarity(polarity:number) { // Function is defined here because if the logic changes, its easier to change function in one place and it will reflect everywhere
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
  
 

